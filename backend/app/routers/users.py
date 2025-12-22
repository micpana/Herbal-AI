from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import UserInput, RecommendationResponse
from ..services.ai_service import get_recommendation

router = APIRouter(prefix="/api/users", tags=["users"])

@router.post("/recommend", response_model=RecommendationResponse)
def recommend(user_input: UserInput, db: Session = Depends(get_db)):
    return get_recommendation(user_input, db)