from langchain.chat_models import init_chat_model
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import ToolNode, tools_condition
from langgraph.graph import END, MessagesState, StateGraph
from langgraph.checkpoint.memory import MemorySaver
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.embeddings import HuggingFaceHubEmbeddings


from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

#Initialize the model
llm = init_chat_model("gemini-2.5-pro", model_provider="google_genai",
    google_api_key=GOOGLE_API_KEY)


# embeddings = HuggingFaceHubEmbeddings(
#     repo_id="sentence-transformers/all-MiniLM-L6-v2",
# )


#Embeddings
# embeddings = HuggingFaceEmbeddings(model_name ="all-MiniLM-L6-v2") 
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GOOGLE_API_KEY
)

#Graph builder
graph_builder = StateGraph(MessagesState)



# Vector store with configurable persistence path
import os
import shutil
chroma_db_path = os.getenv("CHROMA_DB_PATH", "./chroma_langchain_db")

# FORCE clear old ChromaDB data - the collection is corrupted!
if os.path.exists(chroma_db_path):
    shutil.rmtree(chroma_db_path)
    print("🗑️ Cleared corrupted ChromaDB data for fresh start with Google embeddings")

# Use a new collection name for Google embeddings to avoid dimension mismatch
vector_store = Chroma(
    collection_name="google_embeddings_collection",
    embedding_function=embeddings,
    persist_directory=chroma_db_path
)

#Chunking
# Use absolute path to work in both dev and production
import pathlib
current_dir = pathlib.Path(__file__).parent
prompts_dir = current_dir.parent / "prompts"
with open(prompts_dir / "system_prompt.md", "r") as f:
    markdown_content = f.read()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
docs = text_splitter.create_documents([markdown_content])

# Index chunks
_ = vector_store.add_documents(documents=docs)


# Query
@tool(response_format="content_and_artifact")
def retrieve(query: str):
    """Retrieve information related to a query."""
    retrieved_docs = vector_store.similarity_search(query, k=2)
    print(retrieved_docs)
    serialized = "\n\n".join(
        (f"Source: {doc.metadata}\n" f"Content: {doc.page_content}")
        for doc in retrieved_docs
    )
    return serialized, retrieved_docs


# Step 1: Generate an AIMessage that may include a tool-call to be sent.
def query_or_respond(state: MessagesState):
    """Generate tool call for retrieval or respond."""
    llm_with_tools = llm.bind_tools([retrieve])
    response = llm_with_tools.invoke(state["messages"])
    # MessagesState appends messages to state instead of overwriting
    return {"messages": [response]}


# Step 2: Execute the retrieval.
tools = ToolNode([retrieve])


# Step 3: Generate a response using the retrieved content.
def generate(state: MessagesState):
    """Generate answer."""
    # Get generated ToolMessages
    recent_tool_messages = []
    for message in reversed(state["messages"]):
        if message.type == "tool":
            recent_tool_messages.append(message)
        else:
            break
    tool_messages = recent_tool_messages[::-1]

    # Format into prompt
    docs_content = "\n\n".join(doc.content for doc in tool_messages)
    system_message_content = (
        "You are an assistant for question-answering tasks. "
        "Use the following pieces of retrieved context to answer "
        "the question. If you don't know the answer, say that you "
        "don't know. Use three sentences maximum and keep the "
        "answer concise."
        "\n\n"
        f"{docs_content}"
    )
    conversation_messages = [
        message
        for message in state["messages"]
        if message.type in ("human", "system")
        or (message.type == "ai" and not message.tool_calls)
    ]
    prompt = [SystemMessage(system_message_content)] + conversation_messages

    # Run
    response = llm.invoke(prompt)
    return {"messages": [response]}


graph_builder.add_node(query_or_respond)
graph_builder.add_node(tools)
graph_builder.add_node(generate)

graph_builder.set_entry_point("query_or_respond")
graph_builder.add_conditional_edges(
    "query_or_respond",
    tools_condition,
    {END: END, "tools": "tools"},
)
graph_builder.add_edge("tools", "generate")
graph_builder.add_edge("generate", END)

memory = MemorySaver()
graph = graph_builder.compile(checkpointer=memory)

config = {"configurable": {"thread_id": "abc123"}}



# # Test with messages that don't require tool calling
# input_message = "Hello"

# for step in graph.stream(
#     {"messages": [{"role": "user", "content": input_message}]},
#     stream_mode="values",
# ):
#     step["messages"][-1].pretty_print()

# input_message = "What is your restaurant's opening hours?"

# for step in graph.stream(
#     {"messages": [{"role": "user", "content": input_message}]},
#     stream_mode="values",
#     config=config
# ):
#     step["messages"][-1].pretty_print()

# input_message = "In that case, would they align with a Muslim's ramadhan week?"

# for step in graph.stream(
#     {"messages": [{"role": "user", "content": input_message}]},
#     stream_mode="values",
#     config=config,
# ):
#     step["messages"][-1].pretty_print()