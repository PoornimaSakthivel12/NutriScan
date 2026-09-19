from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    date_of_birth = Column(String)
    age = Column(Integer)
    pregnancy_status = Column(String, default="Prefer not to say")
    created_at = Column(DateTime, default=datetime.utcnow)

    scan_history = relationship("ScanHistory", back_populates="user")
    meal_logs = relationship("MealLog", back_populates="user")

class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    calories = Column(Float)
    protein = Column(Float)
    carbohydrates = Column(Float)
    fat = Column(Float)
    fiber = Column(Float)
    sugar = Column(Float)
    sodium = Column(Float)
    vitamins = Column(Text) # JSON string
    minerals = Column(Text) # JSON string
    benefits = Column(Text) # JSON string
    drawbacks = Column(Text) # JSON string
    freshness_applicable = Column(Boolean, default=False)

    ingredients = relationship("Ingredient", back_populates="food")
    suitability = relationship("FoodSuitability", back_populates="food", uselist=False)

class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    food_id = Column(Integer, ForeignKey("foods.id"))
    ingredient_name = Column(String)
    status = Column(String)
    nutrients = Column(Text) # JSON string

    food = relationship("Food", back_populates="ingredients")

class FoodSuitability(Base):
    __tablename__ = "food_suitability"

    id = Column(Integer, primary_key=True, index=True)
    food_id = Column(Integer, ForeignKey("foods.id"))
    kids_status = Column(String)
    adult_status = Column(String)
    pregnancy_status = Column(String)
    elderly_status = Column(String)
    kids_explanation = Column(String)
    adult_explanation = Column(String)
    pregnancy_explanation = Column(String)
    elderly_explanation = Column(String)

    food = relationship("Food", back_populates="suitability")

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_id = Column(Integer, ForeignKey("foods.id"), nullable=True)
    image_data = Column(Text)
    freshness_status = Column(String, nullable=True)
    freshness_confidence = Column(Float, nullable=True)
    scanned_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scan_history")
    food = relationship("Food")

class MealLog(Base):
    __tablename__ = "meal_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_id = Column(Integer, ForeignKey("foods.id"))
    meal_type = Column(String) # Breakfast/Lunch/Snack/Dinner
    quantity = Column(Float, default=1.0)
    logged_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="meal_logs")
    food = relationship("Food")
