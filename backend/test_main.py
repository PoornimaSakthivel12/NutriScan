import pytest
from fastapi.testclient import TestClient
from main import app
from database import SessionLocal
import models

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    # In unified deployment, root serves the React HTML index
    assert "NutriScan" in response.text or "html" in response.text

def test_api_info_endpoint():
    response = client.get("/api/info")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "running"
    assert "NutriScan" in data["message"]

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_get_foods_seeded():
    response = client.get("/foods")
    assert response.status_code == 200
    foods = response.json()
    assert len(foods) >= 27  # All 27 foods seeded
    names = [f["name"] for f in foods]
    assert "Apple" in names
    assert "Banana" in names
    assert "Papaya" in names
    assert "Fried Rice" in names

def test_search_food():
    response = client.get("/foods/search?q=papaya")
    assert response.status_code == 200
    results = response.json()
    assert len(results) >= 1
    assert results[0]["name"] == "Papaya"

def test_food_detail_analysis():
    # Analyze by name
    response = client.post("/food/analyze", json={"food_name": "Fried Rice"})
    assert response.status_code == 200
    detail = response.json()
    assert detail["name"] == "Fried Rice"
    assert "calories" in detail
    assert "protein" in detail
    assert "ingredients" in detail

def test_food_ingredients_detection():
    response = client.post("/food/ingredients", json={"food_name": "Fried Rice"})
    assert response.status_code == 200
    data = response.json()
    assert "ingredients" in data
    assert len(data["ingredients"]) > 0
    assert data["is_mock"] is True

def test_auth_register_and_login():
    import uuid
    random_user = f"test_{uuid.uuid4().hex[:6]}"
    reg_payload = {
        "username": random_user,
        "password": "securepassword123",
        "date_of_birth": "1999-06-15",
        "pregnancy_status": "No"
    }
    reg_resp = client.post("/auth/register", json=reg_payload)
    assert reg_resp.status_code == 200
    reg_data = reg_resp.json()
    assert "access_token" in reg_data
    token = reg_data["access_token"]
    assert reg_data["user"]["username"] == random_user

    # Login with same user
    login_resp = client.post("/auth/login", json={
        "username": random_user,
        "password": "securepassword123"
    })
    assert login_resp.status_code == 200
    assert "access_token" in login_resp.json()

    # Get profile
    profile_resp = client.get("/profile", headers={"Authorization": f"Bearer {token}"})
    assert profile_resp.status_code == 200
    profile_data = profile_resp.json()
    assert profile_data["username"] == random_user
    assert profile_data["age"] > 0
