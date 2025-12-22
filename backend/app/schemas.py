from pydantic import BaseModel
from typing import List, Optional

class UserInput(BaseModel):
    age: int
    allergies: str
    gender: str
    pregnant: Optional[bool] = None
    on_medication: bool
    medications: Optional[str] = ""
    text_input: str
    recommendation_types: List[str]  # e.g., ["fresh_herbs", "dried_herbs", "herbal_capsules"]

class RecommendationResponse(BaseModel):
    recommendation_title: str
    recommendations_markdown_string: str
    recommended_herbs_list: List[dict]
    recommended_products_list: List[dict]
    disclaimer: str

class ProductBase(BaseModel):
    name: str
    images: str
    description: str
    type: str
    ingredients: str
    age_range: str
    genders: str
    pregnancy_friendly: bool
    product_url: str

class Product(ProductBase):
    id: int

class AdminBase(BaseModel):
    name: str
    username: str
    email: str
    password: str  # plain, will hash

class Admin(AdminBase):
    id: int

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UsageStat(BaseModel):
    total_calls: int
    total_tokens: int