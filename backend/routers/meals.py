from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from database import get_db
import models, schemas, auth

router = APIRouter(tags=["meals"])

@router.post("/meals")
def add_meal_log(
    meal: schemas.MealLogCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    food = db.query(models.Food).filter(models.Food.id == meal.food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
        
    new_meal = models.MealLog(
        user_id=current_user.id,
        food_id=meal.food_id,
        meal_type=meal.meal_type,
        quantity=meal.quantity,
        logged_at=datetime.utcnow()
    )
    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)
    return {
        "id": new_meal.id,
        "user_id": new_meal.user_id,
        "food_id": new_meal.food_id,
        "food_name": food.name,
        "category": food.category,
        "calories": food.calories * new_meal.quantity,
        "meal_type": new_meal.meal_type,
        "quantity": new_meal.quantity,
        "logged_at": new_meal.logged_at
    }

@router.get("/meals")
def get_meals(
    date: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    query = db.query(models.MealLog).filter(models.MealLog.user_id == current_user.id)
    if date:
        try:
            target_date = datetime.strptime(date, "%Y-%m-%d").date()
            start_of_day = datetime.combine(target_date, datetime.min.time())
            end_of_day = datetime.combine(target_date, datetime.max.time())
            query = query.filter(models.MealLog.logged_at >= start_of_day, models.MealLog.logged_at <= end_of_day)
        except ValueError:
            pass
            
    meals = query.order_by(models.MealLog.logged_at.desc()).all()
    results = []
    for m in meals:
        food = db.query(models.Food).filter(models.Food.id == m.food_id).first()
        results.append({
            "id": m.id,
            "user_id": m.user_id,
            "food_id": m.food_id,
            "food_name": food.name if food else "Unknown Food",
            "category": food.category if food else "General",
            "calories": (food.calories * m.quantity) if food else 0,
            "meal_type": m.meal_type,
            "quantity": m.quantity,
            "logged_at": m.logged_at
        })
    return results

@router.get("/meals/weekly")
def get_weekly_meals(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    meals = db.query(models.MealLog).filter(
        models.MealLog.user_id == current_user.id,
        models.MealLog.logged_at >= seven_days_ago
    ).all()
    
    # Calculate daily totals
    daily_totals = {}
    for meal in meals:
        day = meal.logged_at.strftime("%Y-%m-%d")
        if day not in daily_totals:
            daily_totals[day] = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "foods_count": 0}
        
        food = db.query(models.Food).filter(models.Food.id == meal.food_id).first()
        if food:
            daily_totals[day]["calories"] += (food.calories * meal.quantity)
            daily_totals[day]["protein"] += (food.protein * meal.quantity)
            daily_totals[day]["carbs"] += (food.carbohydrates * meal.quantity)
            daily_totals[day]["fat"] += (food.fat * meal.quantity)
            daily_totals[day]["foods_count"] += 1
            
    result = []
    for day, totals in daily_totals.items():
        result.append({
            "date": day,
            "total_calories": round(totals["calories"], 1),
            "total_protein": round(totals["protein"], 1),
            "total_carbohydrates": round(totals["carbs"], 1),
            "total_fat": round(totals["fat"], 1),
            "foods_count": totals["foods_count"]
        })
    return result

@router.delete("/meals/{meal_id}")
def delete_meal(
    meal_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    meal = db.query(models.MealLog).filter(models.MealLog.id == meal_id, models.MealLog.user_id == current_user.id).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal log not found")
        
    db.delete(meal)
    db.commit()
    return {"message": "Meal log deleted successfully"}
