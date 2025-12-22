from sqlalchemy import Column, Integer, String, Boolean, ARRAY
from .database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    images = Column(String, default="")
    description = Column(String)
    type = Column(String)  # Fresh Herb/Dried Herb/etc
    ingredients = Column(String)  # comma separated
    age_range = Column(String)  # e.g., "0-100"
    genders = Column(String)  # comma separated
    pregnancy_friendly = Column(Boolean, default=False)
    product_url = Column(String, default="")

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  # hashed

class UsageLog(Base):
    __tablename__ = "usage_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(String)  # ISO string
    tokens_used = Column(Integer)
    user_type = Column(String, default="anonymous")  # for stats