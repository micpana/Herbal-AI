from fastapi import FastAPI
from .routers import users, admins
from .database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(admins.router)