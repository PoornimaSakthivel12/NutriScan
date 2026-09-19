# NutriScan AI — Academic Project Report & Documentation

**Project Title:** NutriScan AI: AI-Powered Food Nutrition, Ingredient, Safety, Freshness & Diet Balance Analyzer  
**Type:** Educational & College Project Prototype  
**Date:** September 2026  
**Tech Stack:** Python FastAPI, SQLite, SQLAlchemy, React 18, Vite, Tailwind CSS, Zustand, Recharts  

---

## 1. Abstract
NutriScan AI is an educational health-technology web application designed to help consumers understand food quality, nutritional profiles, and dietary balance. Through a unified web interface, the system simulates computer-vision-based food recognition, visible ingredient extraction for cooked meals, visual freshness estimation, and optical character recognition (OCR) for packaged foods. Special attention is directed to tailored guidance for specific demographic groups (children, adults, seniors, and pregnant individuals). Crucially, the system follows rigorous safety standards—explicitly labeling automated insights as educational estimates and refraining from inventing unverified hidden ingredients or guaranteed medical advice.

---

## 2. System Architecture

```
+-------------------------------------------------------------------------+
|                              NutriScan AI                               |
+-------------------------------------------------------------------------+
|  CLIENT LAYER (React 18 + Vite + Tailwind CSS + Framer Motion)          |
|  - Onboarding & Registration (Automated DOB age calculation)            |
|  - Dashboard (Hero Scan, Live Summary, Warnings, Freshness)             |
|  - Food Scanner (Webcam getUserMedia, File upload, 27-food selector)    |
|  - Packaged Food OCR Mode (Labels, allergens, expiry status)            |
|  - Full Food Analysis (Macros donut, Vitamins/Minerals, Suitability)    |
|  - Ingredient Detail Page (Contributions, cautions, allergens)          |
|  - Diet Balance Module (Breakfast, Lunch, Snack, Dinner, Water)         |
|  - Weekly Trends (Recharts bar rhythm, food diversity frequencies)     |
+------------------------------------+------------------------------------+
                                     | REST API (HTTP / JSON)
                                     v
+------------------------------------+------------------------------------+
|  BACKEND LAYER (Python FastAPI + Uvicorn)                               |
|  - Auth & Security: JWT Access Tokens, Bcrypt Password Hashing          |
|  - Routers: /auth, /profile, /foods, /scan, /meals                     |
|  - Modular AI Engine:                                                   |
|      * FoodRecognitionService (Multi-class food identification)         |
|      * IngredientDetectionService (Visible ingredient breakdown)        |
|      * FreshnessEstimationService (Visual stage classifier)             |
|      * OCRService (Packaged label data & expiration analyzer)           |
|      * NutritionAnalysisService (USDA-referenced nutritional lookup)    |
+------------------------------------+------------------------------------+
                                     | SQLAlchemy ORM
                                     v
+------------------------------------+------------------------------------+
|  DATA LAYER (SQLite Database - nutriscan.db)                            |
|  - users, foods, ingredients, food_suitability, scan_history, meal_logs|
|  - 27 pre-seeded foods (Fruits, Veggies, Nuts, Prepared dishes)         |
+-------------------------------------------------------------------------+
```

---

## 3. Database Schema Design (Entity-Relationship)

### 3.1 `users`
- `id` (INTEGER, Primary Key)
- `username` (VARCHAR, Unique, Indexed)
- `password_hash` (VARCHAR, Bcrypt salted hash)
- `date_of_birth` (VARCHAR, ISO YYYY-MM-DD)
- `age` (INTEGER, Computed from DOB)
- `pregnancy_status` (VARCHAR: 'Yes', 'No', 'Prefer not to say')
- `created_at` (DATETIME, UTC timestamp)

### 3.2 `foods`
- `id` (INTEGER, Primary Key)
- `name` (VARCHAR, Indexed)
- `category` (VARCHAR: 'Fruit', 'Vegetable', 'Nut', 'Dry Fruit', 'Grain', 'Prepared Food')
- `calories` (FLOAT, kcal per standard serving)
- `protein`, `carbohydrates`, `fat`, `fiber`, `sugar`, `sodium` (FLOAT)
- `vitamins` (TEXT JSON: Vitamin A, B-group, C, D, E, K values)
- `minerals` (TEXT JSON: Calcium, Iron, Magnesium, Potassium, Zinc values)
- `benefits` (TEXT JSON: Array of evidence-based functional benefits)
- `drawbacks` (TEXT JSON: Array of cautions or moderation notes)
- `freshness_applicable` (BOOLEAN: True for fresh produce)

### 3.3 `ingredients`
- `id` (INTEGER, Primary Key)
- `food_id` (INTEGER, Foreign Key -> `foods.id`)
- `ingredient_name` (VARCHAR)
- `status` (VARCHAR: 'Detected', 'Possibly Detected', 'Unable to Determine')
- `nutrients` (TEXT JSON: Nutritional contributions)

### 3.4 `food_suitability`
- `id` (INTEGER, Primary Key)
- `food_id` (INTEGER, Foreign Key -> `foods.id`)
- `kids_status`, `adult_status`, `pregnancy_status`, `elderly_status` (VARCHAR)
- `kids_explanation`, `adult_explanation`, `pregnancy_explanation`, `elderly_explanation` (TEXT)

### 3.5 `scan_history`
- `id` (INTEGER, Primary Key)
- `user_id` (INTEGER, Foreign Key -> `users.id`)
- `food_id` (INTEGER, Foreign Key -> `foods.id`, Nullable)
- `image_data` (TEXT: Reference or base64)
- `freshness_status` (VARCHAR: 'Fresh', 'Ripening', 'Possible Spoilage Signs')
- `freshness_confidence` (FLOAT: 0.0 - 1.0)
- `scanned_at` (DATETIME)

### 3.6 `meal_logs`
- `id` (INTEGER, Primary Key)
- `user_id` (INTEGER, Foreign Key -> `users.id`)
- `food_id` (INTEGER, Foreign Key -> `foods.id`)
- `meal_type` (VARCHAR: 'breakfast', 'lunch', 'snack', 'dinner')
- `quantity` (FLOAT / VARCHAR)
- `logged_at` (DATETIME)

---

## 4. Key Functional Modules

### 4.1 Automated Demographic Categorization
- Date of Birth input triggers non-intrusive age computation:
  - $\text{Child} < 13$
  - $13 \le \text{Teen} < 20$
  - $20 \le \text{Adult} < 60$
  - $\text{Senior} \ge 60$
- Pregnancy mode dynamically alters risk thresholds (e.g. highlighting unripe papaya latex cautions, unpasteurized ingredients, or raw salad hygiene).

### 4.2 Ingredient Detection Integrity Principle
- To prevent AI hallucination, the system adheres to a strict detection hierarchy:
  - **Detected (✅)**: Distinct visible morphological items (e.g. peas, carrots in fried rice).
  - **Possibly Detected (⚠️)**: Partially submerged or blended items (e.g. onion traces, tomato base).
  - **Unable to Determine (❓)**: Hidden substances (cooking oil depth, sodium content, added table sugar, artificial MSG).
- Displays explicit disclaimer: *"Quantity cannot be reliably estimated from an image."*

### 4.3 Packaged Food OCR & Date Freshness
- Extracts printed text from packaging labels.
- Evaluates printed dates against current timestamp:
  - **Valid (🟢)**: Date $> 45$ days remaining.
  - **Near Expiry (🟡)**: Date $\le 45$ days remaining.
  - **Expired (🔴)**: Date in past.
  - **Date Not Detected (⚪)**: Blurred or missing label date.

### 4.4 Non-Restrictive Diet Balance Engine
- Tracks daily food groups (Fruits, Vegetables, Proteins, Hydration).
- Analyzes daily variety to offer actionable, encouraging tips (e.g. *"Consider adding a protein-rich food"*).
- Explicitly rejects toxic diet culture: no extreme caloric deficit warnings, no starvation counters, no rapid weight-loss promotion.

---

## 5. Verification & Testing

### 5.1 Automated Pytest Suite (`backend/test_main.py`)
| Test Case | Description | Result |
| :--- | :--- | :--- |
| `test_root_endpoint` | Verifies unified frontend SPA mounting | PASSED |
| `test_api_info_endpoint` | Verifies API metadata & status | PASSED |
| `test_health_check` | Confirms `/health` endpoint responds with 200 OK | PASSED |
| `test_get_foods_seeded` | Validates that all 27 core foods are seeded in SQLite | PASSED |
| `test_search_food` | Tests case-insensitive search queries | PASSED |
| `test_food_detail_analysis` | Validates macro, vitamin, and ingredient outputs | PASSED |
| `test_food_ingredients_detection` | Tests visible ingredient classifier contract | PASSED |
| `test_auth_register_and_login` | End-to-end user registration, hashing, and JWT authorization | PASSED |

### 5.2 Build Verification
- Vite production compiler transformed 2,545 modules into minified bundles (`dist/index.html`, `dist/assets/index.css`, `dist/assets/index.js`) with zero compile-time syntax errors.

---

## 6. Project Presentation Checklist
When demonstrating NutriScan AI for faculty evaluation:
1. **Open the live application**: Navigate to `http://localhost:8080`.
2. **Onboarding flow**: Showcase welcome screen and profile setup with automated age calculation.
3. **Food Scanning demonstration**:
   - Show live camera capture or test with **Vegetable Fried Rice**.
   - Review visible ingredient chips and the distinction between visible vs. hidden items.
   - Review the nutritional donut chart and progress bars.
4. **Pregnancy mode demonstration**:
   - Go to Profile -> Update Pregnancy Mode to "Yes".
   - Open **Papaya** to demonstrate the prominent latex caution card.
5. **Packaged Food OCR demonstration**:
   - Go to Scan -> Switch to **Label OCR** tab.
   - Select the **Organic Rolled Oats** or **Tomato Herb Pasta Sauce** to demonstrate ingredient list extraction, explicit percentage checks, and expiration date status.
6. **Diet Balance demonstration**:
   - Log foods across Breakfast, Lunch, and Snack.
   - Review real-time progress bars, water tracker, and non-restrictive variety feedback.
   - Open Weekly Overview to view the 7-day caloric rhythm bar chart.
