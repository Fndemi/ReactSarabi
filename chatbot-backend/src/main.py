from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn

# Import your AI core (graph, config, etc.)
from llm_wrapper import graph, config

app = FastAPI()

# Allow CORS for all origins (adjust as needed for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

class ChatResponse(BaseModel):
    response: str


# API Endpoints
@app.get("/")
def root():
    return {"Server Message": "API is running"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: Request, chat: ChatRequest):
    # Stateless: just use the messages sent by the frontend
    user_messages = [msg.dict() for msg in chat.messages]
    # Run through the AI core
    steps = graph.stream({"messages": user_messages}, stream_mode="values", config=config)
    # Get the last response
    last_response = None
    for step in steps:
        last_response = step["messages"][-1].content if step["messages"] else ""
    return {"response": last_response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
