from fastapi import FastAPI
from .routers import users, admins
from .database import Base, engine
import os
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .config import settings

app = FastAPI()

# Allow CORS for frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Create media directory if it doesn't exist
os.makedirs(settings.MEDIA_DIR, exist_ok=True)

# Mount static files for images
app.mount("/media", StaticFiles(directory=settings.MEDIA_DIR), name="media")

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(admins.router)