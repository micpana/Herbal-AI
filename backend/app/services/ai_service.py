from openai import OpenAI
from datetime import datetime
import json
import os
from sqlalchemy.orm import Session
from ..models import UsageLog
from ..utils.herbs_loader import load_herbs
from ..schemas import UserInput, RecommendationResponse
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client... ChatGPT API -----
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# model_name = "gpt-4o"
# ---------------------------------------------
# Initialize OpenAI client... HF Inference API -
client = OpenAI(base_url="https://router.huggingface.co/v1", api_key=os.getenv("HF_TOKEN", ""))
model_name = "openai/gpt-oss-120b:fastest" # model_name:provider -> openai/gpt-oss-120b:fastest / openai/gpt-oss-120b:cheapest / openai/gpt-oss-120b:sambanova
# ---------------------------------------------

def get_products(db: Session):
    return db.query(Product).all()

def build_prompt(user_input: UserInput, herbs: list, products: list):
    user_str = json.dumps(user_input.dict())
    herbs_str = json.dumps(herbs)
    products_str = json.dumps([p.__dict__ for p in products])  # Stringify products

    prompt = f"""
    User input: {user_str}
    Herbs info: {herbs_str}
    Products list: {products_str}

    Make sure your response is in JSON format.
    Make sure that your recommendations / suggestions part is in Markdown format.
    Provide a warm, empathetic explanation of why its given suggestions fit the user's input. Acknowledge the user's input, give the "Why" to your suggestions, and give a proper usage context.
    Give a disclaimer on the footer, and also state that this is not medical advice.
    Prioritize safety and contraindications (e.g., "Don't take X if you have high blood pressure").
    Make its herbal part of the recommendations based ONLY on herbs available in the herbs info json.
    Make its product part of the recommendations based ONLY on products available in our database.
    If herbs info json is empty, improvise, make your own relevant recommendations.
    If our product list / database is empty, do not make any product recommendations, respond with an empty list.
    Its JSON response should be in the format: {{
        "recommendation_title": "",
        "recommendations_markdown_string": "",
        "recommended_herbs_list": [],
        "recommended_products_list": [],
        "disclaimer": ""
    }}
    recommended_herbs_list is a list of herb dicts as per the Herbs data structure.
    recommended_products_list is a list of product dicts as per Products data structure.

    For recommendations:
    - Recommend how to take fresh/dried herbs if selected.
    - If herbs can be made into tea/concoction, provide step-by-step guide.
    - List products with intent to sell, usage routines, pros/cons, further actions.
    - All text output except product listings in markdown.
    """
    return prompt

def get_recommendation(user_input: UserInput, db: Session) -> RecommendationResponse:
    herbs = load_herbs()
    products = get_products(db)
    prompt = build_prompt(user_input, herbs, products)

    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "system", "content": "You are a helpful herbal AI assistant."},
                  {"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response.choices[0].message.content
    json_response = json.loads(content)  # Assume well-formed

    # Log usage
    tokens = response.usage.total_tokens
    log = UsageLog(timestamp=datetime.utcnow().isoformat(), tokens_used=tokens)
    db.add(log)
    db.commit()

    return RecommendationResponse(**json_response)