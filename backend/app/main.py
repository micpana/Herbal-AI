from fastapi import FastAPI
from .routers import users, admins
from .database import Base, engine
import os
from fastapi.staticfiles import StaticFiles
from config import settings

app = FastAPI()

# Create media directory if it doesn't exist
os.makedirs(settings.MEDIA_DIR, exist_ok=True)

# Mount static files for images
app.mount("/media", StaticFiles(directory=settings.MEDIA_DIR), name="media")

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(admins.router)