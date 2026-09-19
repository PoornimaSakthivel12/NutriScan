"""
NutriScan AI — Mock AI Services
================================
These are DEMO/MOCK services for educational prototype purposes.
Each class is clearly labeled with is_mock=True in responses.
To replace with real AI: implement the same interface and swap the service instance.
"""

import random
import models
import json

# ─────────────────────────────────────────────────────────────────────────────
# FOOD RECOGNITION SERVICE
# ─────────────────────────────────────────────────────────────────────────────

class FoodRecognitionService:
    """
    MOCK food recognition service.
    Replace recognize() with a real computer vision model (e.g., Google Vision,
    TensorFlow, PyTorch model) that accepts image bytes and returns food info.
    """

    FOOD_DATABASE = [
        {"name": "Apple", "category": "Fruit", "emoji": "🍎"},
        {"name": "Banana", "category": "Fruit", "emoji": "🍌"},
        {"name": "Papaya", "category": "Fruit", "emoji": "🧡"},
        {"name": "Mango", "category": "Fruit", "emoji": "🥭"},
        {"name": "Orange", "category": "Fruit", "emoji": "🍊"},
        {"name": "Grapes", "category": "Fruit", "emoji": "🍇"},
        {"name": "Watermelon", "category": "Fruit", "emoji": "🍉"},
        {"name": "Tomato", "category": "Vegetable", "emoji": "🍅"},
        {"name": "Onion", "category": "Vegetable", "emoji": "🧅"},
        {"name": "Carrot", "category": "Vegetable", "emoji": "🥕"},
        {"name": "Potato", "category": "Vegetable", "emoji": "🥔"},
        {"name": "Cucumber", "category": "Vegetable", "emoji": "🥒"},
        {"name": "Capsicum", "category": "Vegetable", "emoji": "🫑"},
        {"name": "Green Peas", "category": "Vegetable", "emoji": "🟢"},
        {"name": "Almond", "category": "Nut", "emoji": "🌰"},
        {"name": "Cashew", "category": "Nut", "emoji": "🥜"},
        {"name": "Dates", "category": "Dry Fruit", "emoji": "🌴"},
        {"name": "Raisins", "category": "Dry Fruit", "emoji": "🍇"},
        {"name": "Walnut", "category": "Nut", "emoji": "🌰"},
        {"name": "Rice", "category": "Grain", "emoji": "🍚"},
        {"name": "Idli", "category": "Prepared Food", "emoji": "🫓"},
        {"name": "Dosa", "category": "Prepared Food", "emoji": "🫔"},
        {"name": "Chapati", "category": "Prepared Food", "emoji": "🫓"},
        {"name": "Fried Rice", "category": "Prepared Food", "emoji": "🍛"},
        {"name": "Vegetable Curry", "category": "Prepared Food", "emoji": "🍲"},
        {"name": "Salad", "category": "Prepared Food", "emoji": "🥗"},
        {"name": "Sandwich", "category": "Prepared Food", "emoji": "🥪"},
    ]

    def recognize(self, image_bytes: bytes) -> dict:
        """
        # DEMO/MOCK SERVICE
        Returns a randomly selected food for demonstration purposes.
        Replace this method with a real CV model for production use.
        """
        seed_val = sum(image_bytes[:50]) if len(image_bytes) >= 50 else len(image_bytes)
        random.seed(seed_val)
        food = random.choice(self.FOOD_DATABASE)
        confidence = round(random.uniform(0.78, 0.96), 2)
        return {
            "food_name": food["name"],
            "category": food["category"],
            "emoji": food["emoji"],
            "confidence": confidence,
            "confidence_percent": f"{int(confidence * 100)}%",
            "is_mock": True,
            "disclaimer": (
                "⚠️ DEMO MODE: This is a mock AI recognition result for educational purposes. "
                "No real image analysis was performed. Connect a real CV model for actual food detection."
            )
        }


# ─────────────────────────────────────────────────────────────────────────────
# INGREDIENT DETECTION SERVICE
# ─────────────────────────────────────────────────────────────────────────────

class IngredientDetectionService:
    """
    MOCK ingredient detection service.
    Replace detect() with a real computer vision model that identifies
    visible ingredients from food images.
    """

    FOOD_INGREDIENTS = {
        "Fried Rice": [
            {"name": "Rice", "status": "Detected", "emoji": "🍚", "description": "Base grain, provides carbohydrates and energy"},
            {"name": "Carrot", "status": "Detected", "emoji": "🥕", "description": "Orange vegetable, rich in Vitamin A"},
            {"name": "Capsicum", "status": "Detected", "emoji": "🫑", "description": "Bell pepper, provides Vitamin C"},
            {"name": "Green Peas", "status": "Detected", "emoji": "🟢", "description": "Legume, provides plant protein and fiber"},
            {"name": "Onion", "status": "Possibly Detected", "emoji": "🧅", "description": "Adds flavor, contains antioxidants"},
            {"name": "Tomato", "status": "Possibly Detected", "emoji": "🍅", "description": "Provides lycopene and Vitamin C"},
            {"name": "Oil/Fat", "status": "Unable to Determine", "emoji": "🫙", "description": "Cannot be reliably detected from image"},
            {"name": "Salt", "status": "Unable to Determine", "emoji": "🧂", "description": "Cannot be reliably detected from image"},
        ],
        "Vegetable Curry": [
            {"name": "Potato", "status": "Detected", "emoji": "🥔", "description": "Starchy vegetable, provides energy"},
            {"name": "Carrot", "status": "Detected", "emoji": "🥕", "description": "Rich in beta-carotene and Vitamin A"},
            {"name": "Tomato", "status": "Detected", "emoji": "🍅", "description": "Provides base sauce and lycopene"},
            {"name": "Onion", "status": "Detected", "emoji": "🧅", "description": "Flavor base, contains quercetin"},
            {"name": "Capsicum", "status": "Possibly Detected", "emoji": "🫑", "description": "Provides color and Vitamin C"},
            {"name": "Green Peas", "status": "Possibly Detected", "emoji": "🟢", "description": "Adds protein and fiber"},
            {"name": "Spices", "status": "Unable to Determine", "emoji": "🌶️", "description": "Cannot be reliably identified from image"},
            {"name": "Oil", "status": "Unable to Determine", "emoji": "🫙", "description": "Cannot be reliably detected from image"},
        ],
        "Salad": [
            {"name": "Tomato", "status": "Detected", "emoji": "🍅", "description": "Provides Vitamin C and lycopene"},
            {"name": "Cucumber", "status": "Detected", "emoji": "🥒", "description": "Hydrating vegetable, low calorie"},
            {"name": "Capsicum", "status": "Detected", "emoji": "🫑", "description": "Rich in Vitamin C and antioxidants"},
            {"name": "Onion", "status": "Possibly Detected", "emoji": "🧅", "description": "Adds flavor and antioxidants"},
            {"name": "Carrot", "status": "Possibly Detected", "emoji": "🥕", "description": "Provides beta-carotene"},
            {"name": "Dressing", "status": "Unable to Determine", "emoji": "🫙", "description": "Cannot be reliably detected from image"},
        ],
        "Sandwich": [
            {"name": "Bread", "status": "Detected", "emoji": "🍞", "description": "Provides carbohydrates and some B vitamins"},
            {"name": "Tomato", "status": "Detected", "emoji": "🍅", "description": "Provides Vitamin C and lycopene"},
            {"name": "Cucumber", "status": "Possibly Detected", "emoji": "🥒", "description": "Hydrating, low calorie"},
            {"name": "Capsicum", "status": "Possibly Detected", "emoji": "🫑", "description": "Provides Vitamin C"},
            {"name": "Cheese/Spread", "status": "Unable to Determine", "emoji": "🧀", "description": "Cannot be reliably detected from image"},
            {"name": "Salt/Seasoning", "status": "Unable to Determine", "emoji": "🧂", "description": "Cannot be reliably detected from image"},
        ],
        "Idli": [
            {"name": "Rice Batter", "status": "Detected", "emoji": "🍚", "description": "Fermented rice, provides carbohydrates"},
            {"name": "Urad Dal", "status": "Possibly Detected", "emoji": "🫘", "description": "Black gram lentil, provides protein"},
        ],
        "Dosa": [
            {"name": "Rice Batter", "status": "Detected", "emoji": "🍚", "description": "Fermented rice, provides carbohydrates"},
            {"name": "Urad Dal", "status": "Possibly Detected", "emoji": "🫘", "description": "Black gram lentil, provides protein"},
            {"name": "Oil", "status": "Unable to Determine", "emoji": "🫙", "description": "Cannot be reliably detected from image"},
        ],
        "Chapati": [
            {"name": "Whole Wheat Flour", "status": "Detected", "emoji": "🌾", "description": "Provides complex carbohydrates and fiber"},
            {"name": "Oil/Ghee", "status": "Unable to Determine", "emoji": "🫙", "description": "Cannot be reliably detected from image"},
            {"name": "Salt", "status": "Unable to Determine", "emoji": "🧂", "description": "Cannot be reliably detected from image"},
        ],
        "Rice": [
            {"name": "Rice", "status": "Detected", "emoji": "🍚", "description": "Staple grain providing carbohydrates and energy"},
        ],
        "Apple": [],
        "Banana": [],
        "Papaya": [],
        "Mango": [],
        "Orange": [],
        "Grapes": [],
        "Watermelon": [],
        "Tomato": [],
        "Onion": [],
        "Carrot": [],
        "Potato": [],
        "Cucumber": [],
        "Capsicum": [],
        "Green Peas": [],
        "Almond": [],
        "Cashew": [],
        "Dates": [],
        "Raisins": [],
        "Walnut": [],
    }

    INGREDIENT_DISCLAIMER = (
        "⚠️ Ingredient detection is an AI-based estimate. "
        "Please verify ingredients manually when accuracy is important. "
        "Hidden ingredients such as salt, sugar, oil, and spices cannot be reliably detected from an image. "
        "Quantity cannot be reliably estimated from image."
    )

    def detect(self, food_name: str) -> dict:
        """
        # DEMO/MOCK SERVICE
        Returns ingredient list based on food name from lookup table.
        Replace with real CV ingredient detection model for production use.
        """
        ingredients = self.FOOD_INGREDIENTS.get(food_name, [])
        return {
            "ingredients": ingredients,
            "is_mock": True,
            "disclaimer": self.INGREDIENT_DISCLAIMER
        }


# ─────────────────────────────────────────────────────────────────────────────
# FRESHNESS ESTIMATION SERVICE
# ─────────────────────────────────────────────────────────────────────────────

class FreshnessEstimationService:
    """
    MOCK freshness estimation service.
    Replace estimate() with a real CV model that analyzes image color,
    texture, and surface features to estimate freshness.
    """

    FRESHNESS_MAP = {
        "Fruit": {
            "Fresh": "Vibrant color, firm texture, no visible spots or bruising detected.",
            "Ripening": "Color changes indicate ripening stage. Slight softening may be present.",
            "Possible Spoilage Signs": "Dark spots, bruising, or overripening signs detected. Inspect carefully before consuming.",
        },
        "Vegetable": {
            "Fresh": "Bright color, crisp appearance, no wilting detected.",
            "Ripening": "Slight color change or softness detected. May be at peak ripeness.",
            "Possible Spoilage Signs": "Wilting, discoloration, or soft spots detected. Inspect carefully before consuming.",
        },
        "Grain": None,
        "Nut": None,
        "Dry Fruit": None,
        "Prepared Food": None,
    }

    FRESHNESS_DISCLAIMER = (
        "⚠️ Freshness is an image-based estimate and cannot guarantee that food is safe to eat. "
        "Always use your own judgment and consult food safety guidelines. "
        "This estimate is for educational purposes only."
    )

    def estimate(self, food_name: str, category: str) -> dict:
        """
        # DEMO/MOCK SERVICE
        Returns a freshness estimate based on food category.
        Replace with real image analysis for production use.
        """
        freshness_data = self.FRESHNESS_MAP.get(category)

        if freshness_data is None:
            return {
                "status": "Unable to Determine",
                "visual_signs": f"Freshness estimation is not applicable for {category} foods.",
                "confidence": 0.0,
                "is_mock": True,
                "disclaimer": self.FRESHNESS_DISCLAIMER
            }

        statuses = ["Fresh", "Fresh", "Ripening", "Ripening", "Possible Spoilage Signs"]
        status = random.choice(statuses)
        confidence_map = {"Fresh": (0.75, 0.92), "Ripening": (0.65, 0.85), "Possible Spoilage Signs": (0.55, 0.80)}
        lo, hi = confidence_map[status]
        confidence = round(random.uniform(lo, hi), 2)

        return {
            "status": status,
            "visual_signs": freshness_data[status],
            "confidence": confidence,
            "confidence_percent": f"{int(confidence * 100)}%",
            "is_mock": True,
            "disclaimer": self.FRESHNESS_DISCLAIMER
        }


# ─────────────────────────────────────────────────────────────────────────────
# OCR SERVICE
# ─────────────────────────────────────────────────────────────────────────────

class OCRService:
    """
    MOCK OCR service.
    Replace extract() with Tesseract.js (frontend) or pytesseract/Google Vision (backend)
    for real packaged food label reading.
    """

    SAMPLE_PACKAGED_FOODS = [
        {
            "product_name": "Whole Grain Oats Cereal",
            "ingredients_list": [
                "Whole Grain Oats", "Sugar", "Salt", "Barley Malt Extract",
                "Vitamin D", "Calcium Carbonate", "Iron", "Zinc"
            ],
            "nutrition_facts": {
                "calories": 379,
                "protein": "13g",
                "carbohydrates": "68g",
                "fat": "7g",
                "fiber": "10g",
                "sugar": "1g",
                "sodium": "2mg"
            },
            "allergens": ["Gluten", "May contain traces of nuts"],
            "manufacturing_date": "2024-01-15",
            "expiry_date": "2025-01-14",
            "best_before": "2025-01-14"
        },
        {
            "product_name": "Mixed Fruit Juice",
            "ingredients_list": [
                "Water", "Apple Juice Concentrate", "Orange Juice Concentrate",
                "Citric Acid", "Natural Flavours", "Ascorbic Acid (Vitamin C)"
            ],
            "nutrition_facts": {
                "calories": 45,
                "protein": "0.3g",
                "carbohydrates": "11g",
                "fat": "0g",
                "fiber": "0.2g",
                "sugar": "10g",
                "sodium": "10mg"
            },
            "allergens": ["None declared"],
            "manufacturing_date": "2024-06-01",
            "expiry_date": "2024-12-01",
            "best_before": "2024-12-01"
        },
        {
            "product_name": "Whole Wheat Crackers",
            "ingredients_list": [
                "Whole Wheat Flour", "Vegetable Oil", "Salt",
                "Yeast Extract", "Sesame Seeds"
            ],
            "nutrition_facts": {
                "calories": 408,
                "protein": "11g",
                "carbohydrates": "68g",
                "fat": "12g",
                "fiber": "7g",
                "sugar": "2g",
                "sodium": "650mg"
            },
            "allergens": ["Gluten", "Sesame"],
            "manufacturing_date": "2024-05-10",
            "expiry_date": "2025-05-09",
            "best_before": "2025-05-09"
        }
    ]

    OCR_DISCLAIMER = (
        "⚠️ This is a DEMO OCR result for educational purposes. "
        "No real label scanning was performed. "
        "Connect Tesseract or Google Vision API for actual packaged food label reading."
    )

    def extract(self, image_bytes: bytes) -> dict:
        """
        # DEMO/MOCK SERVICE
        Returns sample packaged food data for demonstration.
        Replace with real OCR (pytesseract / Google Vision / Azure OCR) for production.
        """
        seed_val = sum(image_bytes[:30]) if len(image_bytes) >= 30 else len(image_bytes)
        random.seed(seed_val)
        sample = random.choice(self.SAMPLE_PACKAGED_FOODS)
        return {
            **sample,
            "is_mock": True,
            "disclaimer": self.OCR_DISCLAIMER
        }


# ─────────────────────────────────────────────────────────────────────────────
# NUTRITION ANALYSIS SERVICE
# ─────────────────────────────────────────────────────────────────────────────

class NutritionAnalysisService:
    """
    Nutrition lookup service using seeded database data.
    This service queries the real SQLite database seeded with USDA-based data.
    """

    def analyze(self, food_name: str, db) -> dict:
        food = db.query(models.Food).filter(models.Food.name.ilike(food_name)).first()
        if not food:
            return None

        ingredients = db.query(models.Ingredient).filter(models.Ingredient.food_id == food.id).all()
        suitability = db.query(models.FoodSuitability).filter(models.FoodSuitability.food_id == food.id).first()

        ingredient_list = []
        for ing in ingredients:
            nutrients = {}
            try:
                nutrients = json.loads(ing.nutrients) if ing.nutrients else {}
            except Exception:
                pass
            ingredient_list.append({
                "id": ing.id,
                "name": ing.ingredient_name,
                "status": ing.status,
                "emoji": ing.status,
                "nutrients": nutrients,
            })

        vitamins = {}
        minerals = {}
        benefits = []
        drawbacks = []
        try:
            vitamins = json.loads(food.vitamins) if food.vitamins else {}
            minerals = json.loads(food.minerals) if food.minerals else {}
            benefits = json.loads(food.benefits) if food.benefits else []
            drawbacks = json.loads(food.drawbacks) if food.drawbacks else []
        except Exception:
            pass

        return {
            "id": food.id,
            "name": food.name,
            "category": food.category,
            "calories": food.calories,
            "protein": food.protein,
            "carbohydrates": food.carbohydrates,
            "fat": food.fat,
            "fiber": food.fiber,
            "sugar": food.sugar,
            "sodium": food.sodium,
            "vitamins": vitamins,
            "minerals": minerals,
            "benefits": benefits,
            "drawbacks": drawbacks,
            "freshness_applicable": food.freshness_applicable,
            "ingredients": ingredient_list,
            "suitability": {
                "kids_status": suitability.kids_status if suitability else "Generally Suitable",
                "adult_status": suitability.adult_status if suitability else "Generally Suitable",
                "pregnancy_status": suitability.pregnancy_status if suitability else "Caution",
                "elderly_status": suitability.elderly_status if suitability else "Generally Suitable",
                "kids_explanation": suitability.kids_explanation if suitability else "General educational info.",
                "adult_explanation": suitability.adult_explanation if suitability else "General educational info.",
                "pregnancy_explanation": suitability.pregnancy_explanation if suitability else "Please consult a healthcare professional.",
                "elderly_explanation": suitability.elderly_explanation if suitability else "General educational info.",
            } if suitability else None,
            "is_mock": False,
            "data_source": "Educational demo data based on USDA FoodData Central approximations. Not for medical use."
        }
