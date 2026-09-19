from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    date_of_birth: str
    pregnancy_status: str = "Prefer not to say"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    age: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    username: Optional[str] = None
    date_of_birth: Optional[str] = None
    pregnancy_status: Optional[str] = None

# --- Food & Nutrition Schemas ---
class IngredientResponse(BaseModel):
    id: int
    ingredient_name: str
    status: str
    nutrients: str
    model_config = ConfigDict(from_attributes=True)

class SuitabilityResponse(BaseModel):
    kids_status: str
    adult_status: str
    pregnancy_status: str
    elderly_status: str
    kids_explanation: str
    adult_explanation: str
    pregnancy_explanation: str
    elderly_explanation: str
    model_config = ConfigDict(from_attributes=True)

class FoodListResponse(BaseModel):
    id: int
    name: str
    category: str
    calories: float
    model_config = ConfigDict(from_attributes=True)

class FoodResponse(BaseModel):
    id: int
    name: str
    category: str
    calories: float
    protein: float
    carbohydrates: float
    fat: float
    fiber: float
    sugar: float
    sodium: float
    vitamins: str
    minerals: str
    benefits: str
    drawbacks: str
    freshness_applicable: bool
    ingredients: List[IngredientResponse] = []
    suitability: Optional[SuitabilityResponse] = None
    model_config = ConfigDict(from_attributes=True)

# --- Scan Schemas ---
class ScanRequest(BaseModel):
    pass # Image will be sent as multipart/form-data

class ScanResponse(BaseModel):
    food_name: str
    category: str
    confidence: float
    is_mock: bool = True
    disclaimer: str

class FreshnessRequest(BaseModel):
    food_name: str
    category: str

class FreshnessResponse(BaseModel):
    status: str
    visual_signs: str
    confidence: float
    disclaimer: str
    is_mock: bool = True

class OCRResponse(BaseModel):
    product_name: str
    ingredients_list: List[str]
    nutrition_facts: dict
    allergens: List[str]
    manufacturing_date: str
    expiry_date: str
    is_mock: bool = True

class ScanHistoryResponse(BaseModel):
    id: int
    user_id: int
    food_id: Optional[int] = None
    freshness_status: Optional[str] = None
    freshness_confidence: Optional[float] = None
    scanned_at: datetime
    model_config = ConfigDict(from_attributes=True)

# --- Meal Log Schemas ---
class MealLogCreate(BaseModel):
    food_id: int
    meal_type: str # Breakfast/Lunch/Snack/Dinner
    quantity: float = 1.0

class MealLogResponse(BaseModel):
    id: int
    user_id: int
    food_id: int
    meal_type: str
    quantity: float
    logged_at: datetime
    model_config = ConfigDict(from_attributes=True)

class DailyNutritionResponse(BaseModel):
    date: str
    total_calories: float
    total_protein: float
    total_carbohydrates: float
    total_fat: float

# --- Token Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
