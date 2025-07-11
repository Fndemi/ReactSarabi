# Test which imports your app actually needs
# Run this to see what's missing:

from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langgraph.graph import StateGraph, MessagesState
from langgraph.prebuilt import ToolNode

print("✅ All core imports work!")
