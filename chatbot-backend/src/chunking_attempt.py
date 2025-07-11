from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from dotenv import load_dotenv
import os
import pathlib
import shutil

load_dotenv()

GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")

print("=== DEBUGGING EMBEDDINGS AND RETRIEVAL ===\n")

# 1. Initialize embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GOOGLE_API_KEY
)

# 2. Load and show your content
current_dir = pathlib.Path(__file__).parent
prompts_dir = current_dir.parent / "prompts"
with open(prompts_dir / "system_prompt.md", "r") as f:
    markdown_content = f.read()

print("=== ORIGINAL CONTENT ===")
print(f"Content length: {len(markdown_content)} characters")
print(f"First 500 chars: {markdown_content[:500]}...")
print("\n" + "="*50 + "\n")

# 3. Test chunking
text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
docs = text_splitter.create_documents([markdown_content])

print(f"=== CHUNKING RESULTS ===")
print(f"Total chunks: {len(docs)}")
for i, doc in enumerate(docs):
    print(f"\nChunk {i}:")
    print(f"Content: {doc.page_content}")
    print("-" * 40)

# 4. Test individual embedding
print("\n=== TESTING EMBEDDINGS ===")
test_text = "What are your opening hours?"
try:
    embedding_result = embeddings.embed_query(test_text)
    print(f"✅ Embedding successful!")
    print(f"Query: '{test_text}'")
    print(f"Embedding dimensions: {len(embedding_result)}")
    print(f"First 5 values: {embedding_result[:5]}")
except Exception as e:
    print(f"❌ Embedding failed: {e}")

# 5. Test vector store and retrieval
print("\n=== TESTING VECTOR STORE ===")
try:
    # Clear old data for fresh start
    chroma_db_path = "./debug_chroma_db"
    if os.path.exists(chroma_db_path):
        shutil.rmtree(chroma_db_path)
    
    # Create vector store
    vector_store = Chroma(
        collection_name="debug_collection",
        embedding_function=embeddings,
        persist_directory=chroma_db_path
    )
    
    # Add documents
    print("Adding documents to vector store...")
    vector_store.add_documents(documents=docs)
    print(f"✅ Successfully added {len(docs)} documents")
    
    # Test queries
    test_queries = [
        "What are your opening hours?",
        "What time do you open?",
        "When are you open?",
        "opening hours",
        "restaurant hours",
        "Monday Tuesday hours",
        "am pm time"
    ]
    
    print("\n=== TESTING RETRIEVAL ===")
    for query in test_queries:
        print(f"\n🔍 Query: '{query}'")
        try:
            results = vector_store.similarity_search(query, k=3)
            print(f"Found {len(results)} results:")
            for i, result in enumerate(results):
                print(f"  Result {i+1}: {result.page_content[:100]}...")
                if len(result.page_content) > 100:
                    print(f"              ...{result.page_content[-50:]}")
        except Exception as e:
            print(f"❌ Query failed: {e}")
        print("-" * 60)

except Exception as e:
    print(f"❌ Vector store setup failed: {e}")

# 6. Search for opening hours keywords in content
print("\n=== SEARCHING FOR OPENING HOURS KEYWORDS ===")
keywords = ["hour", "open", "close", "time", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "am", "pm", "morning", "evening"]
found_keywords = []

for keyword in keywords:
    if keyword.lower() in markdown_content.lower():
        found_keywords.append(keyword)
        # Find the context around the keyword
        content_lower = markdown_content.lower()
        start = max(0, content_lower.find(keyword.lower()) - 50)
        end = min(len(markdown_content), content_lower.find(keyword.lower()) + len(keyword) + 50)
        context = markdown_content[start:end]
        print(f"'{keyword}' found in context: ...{context}...")

if not found_keywords:
    print("❌ No opening hours keywords found in your content!")
    print("This explains why retrieval isn't working for opening hours queries.")
else:
    print(f"✅ Found keywords: {found_keywords}")

print("\n=== DEBUG COMPLETE ===")