from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # OpenAI / Hugging Face
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    HF_TOKEN: str = os.getenv("HF_TOKEN", "")

    # JWT / Auth
    JWT_SECRET: str = os.getenv("JWT_SECRET", "fallback-secret-change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Media / Paths
    MEDIA_DIR: str = "media"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()