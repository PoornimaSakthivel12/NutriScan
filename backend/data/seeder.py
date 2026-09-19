from sqlalchemy.orm import Session
import models
from data.seed_data import SEED_FOODS
import json

def seed_database(db: Session):
    # Check if data already exists
    if db.query(models.Food).first():
        print("Database already seeded.")
        return

    print("Seeding database...")
    for food_data in SEED_FOODS:
        food = models.Food(
            name=food_data["name"],
            category=food_data["category"],
            calories=food_data["calories"],
            protein=food_data["protein"],
            carbohydrates=food_data["carbohydrates"],
            fat=food_data["fat"],
            fiber=food_data["fiber"],
            sugar=food_data["sugar"],
            sodium=food_data["sodium"],
            vitamins=food_data["vitamins"],
            minerals=food_data["minerals"],
            benefits=food_data["benefits"],
            drawbacks=food_data["drawbacks"],
            freshness_applicable=food_data["freshness_applicable"]
        )
        db.add(food)
        db.flush() # To get food.id

        # Add ingredients if any
        if "ingredients" in food_data:
            for ing in food_data["ingredients"]:
                ingredient = models.Ingredient(
                    food_id=food.id,
                    ingredient_name=ing["name"],
                    status=ing["status"],
                    nutrients="{}"
                )
                db.add(ingredient)
        
        # Add suitability
        if "suitability" in food_data:
            suit = food_data["suitability"]
            suitability = models.FoodSuitability(
                food_id=food.id,
                kids_status=suit["kids_status"],
                adult_status=suit["adult_status"],
                pregnancy_status=suit["pregnancy_status"],
                elderly_status=suit["elderly_status"],
                kids_explanation=suit["kids_explanation"],
                adult_explanation=suit["adult_explanation"],
                pregnancy_explanation=suit["pregnancy_explanation"],
                elderly_explanation=suit["elderly_explanation"]
            )
            db.add(suitability)
            
    db.commit()
    print("Database seeded successfully.")
