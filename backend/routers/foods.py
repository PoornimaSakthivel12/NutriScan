from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Any, Dict
from pydantic import BaseModel
from database import get_db
import models, schemas
from services.ai_services import NutritionAnalysisService, IngredientDetectionService

router = APIRouter(tags=["foods"])
nutrition_service = NutritionAnalysisService()
ingredient_service = IngredientDetectionService()

class AnalyzeRequest(BaseModel):
    food_name: str

class IngredientsRequest(BaseModel):
    food_name: str

@router.get("/foods", response_model=List[schemas.FoodListResponse])
def get_foods(db: Session = Depends(get_db)):
    foods = db.query(models.Food).all()
    return foods

@router.get("/foods/search", response_model=List[schemas.FoodListResponse])
def search_foods(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    foods = db.query(models.Food).filter(models.Food.name.ilike(f"%{q}%")).all()
    return foods

@router.get("/foods/{food_id}")
def get_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(models.Food).filter(models.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    
    # Use nutrition service to get rich parsed representation
    analysis = nutrition_service.analyze(food.name, db)
    if analysis:
        return analysis
    return food

@router.post("/food/analyze")
def analyze_food(req: AnalyzeRequest, db: Session = Depends(get_db)):
    result = nutrition_service.analyze(req.food_name, db)
    if not result:
        raise HTTPException(status_code=404, detail="Analysis failed, food not found in database")
    return result

@router.post("/food/ingredients")
def detect_ingredients(req: IngredientsRequest):
    result = ingredient_service.detect(req.food_name)
    return result
