from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from database import get_db
import models, schemas, auth

router = APIRouter(tags=["profile"])

def calculate_age(dob: str) -> int:
    try:
        birth_date = datetime.strptime(dob, "%Y-%m-%d")
        today = datetime.today()
        age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        return age
    except ValueError:
        return 0

@router.get("/profile", response_model=schemas.UserResponse)
def get_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.UserResponse)
def update_profile(
    profile_update: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if profile_update.username is not None:
        if profile_update.username != current_user.username:
            db_user = db.query(models.User).filter(models.User.username == profile_update.username).first()
            if db_user:
                raise HTTPException(status_code=400, detail="Username already exists")
            current_user.username = profile_update.username
            
    if profile_update.date_of_birth is not None:
        current_user.date_of_birth = profile_update.date_of_birth
        current_user.age = calculate_age(profile_update.date_of_birth)
        
    if profile_update.pregnancy_status is not None:
        current_user.pregnancy_status = profile_update.pregnancy_status
        
    db.commit()
    db.refresh(current_user)
    return current_user
