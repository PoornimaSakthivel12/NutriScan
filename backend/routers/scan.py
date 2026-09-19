from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
import models, schemas, auth
from services.ai_services import FoodRecognitionService, FreshnessEstimationService, OCRService
from datetime import datetime

router = APIRouter(tags=["scan"])

food_recognition_service = FoodRecognitionService()
freshness_service = FreshnessEstimationService()
ocr_service = OCRService()

@router.post("/food/scan")
async def scan_food(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    contents = await file.read()
    result = food_recognition_service.recognize(contents)
    
    # Match in database
    food = db.query(models.Food).filter(models.Food.name.ilike(result["food_name"])).first()
    
    # Save to history
    new_scan = models.ScanHistory(
        user_id=current_user.id,
        food_id=food.id if food else None,
        image_data="uploaded_image",
        freshness_status="Fresh",
        freshness_confidence=result.get("confidence", 0.9),
        scanned_at=datetime.utcnow()
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    
    return {
        "food_id": food.id if food else 1,
        "food_name": result["food_name"],
        "category": result["category"],
        "emoji": result.get("emoji", "🥗"),
        "confidence": result["confidence"],
        "confidence_percent": result.get("confidence_percent", "92%"),
        "is_mock": True,
        "disclaimer": result["disclaimer"]
    }

@router.post("/food/freshness", response_model=schemas.FreshnessResponse)
def get_freshness(
    req: schemas.FreshnessRequest,
    current_user: models.User = Depends(auth.get_current_user)
):
    result = freshness_service.estimate(req.food_name, req.category)
    return result

@router.post("/food/ocr", response_model=schemas.OCRResponse)
async def perform_ocr(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_user)
):
    contents = await file.read()
    result = ocr_service.extract(contents)
    return result

@router.get("/history")
def get_scan_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    history = db.query(models.ScanHistory).filter(models.ScanHistory.user_id == current_user.id).order_by(models.ScanHistory.scanned_at.desc()).all()
    results = []
    for h in history:
        food = db.query(models.Food).filter(models.Food.id == h.food_id).first() if h.food_id else None
        results.append({
            "id": h.id,
            "user_id": h.user_id,
            "food_id": h.food_id,
            "food_name": food.name if food else "Scanned Food",
            "category": food.category if food else "General",
            "freshness_status": h.freshness_status or "Fresh",
            "freshness_confidence": h.freshness_confidence or 0.9,
            "scanned_at": h.scanned_at
        })
    return results
