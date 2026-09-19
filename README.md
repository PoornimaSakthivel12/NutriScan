# 🥗 NutriScan AI
### AI-Powered Food Nutrition, Ingredient, Safety, Freshness & Diet Balance Analyzer

> **Educational & College Project Prototype**  
> *Health, pregnancy, and freshness information are provided as estimates/general guidance and are NOT guaranteed medical or food-safety advice.*

---

## 🌟 Key Highlights & Features

1. **First-Time Login / Profile Setup**
   - Welcoming onboarding screen (*"Understand your food. Make informed choices."*).
   - Date of Birth with automated age calculation and categorization (`Child`, `Teen`, `Adult`, `Senior`).
   - Optional Pregnancy Mode status (`Yes`, `No`, `Prefer not to say`).
   - Simple secure authentication with bcrypt password hashing and JWT token support.

2. **Modern Health-Tech Dashboard**
   - Personalized greeting with age group mode.
   - Primary prominent action: **📷 SCAN FOOD**.
   - Quick action grid: **Upload Image**, **Search Food**, **Diet Balance**, **Scan History**.
   - Live cards for **Recent Food**, **Nutrition Summary**, **Important Warnings**, **Freshness**, and **Diet Balance**.

3. **Food Scanner & Recognition**
   - Camera viewfinder (`getUserMedia`) + image file upload + retake options.
   - Animated *"Analyzing your food..."* loading state.
   - Quick 1-click test selector covering all 27 foods.
   - Packaged Food Label OCR mode for scanning ingredients, nutrition facts, and expiry dates.

4. **Detailed Food Analysis Dashboard**
   - **Estimated Identification & Confidence** (e.g. *"Vegetable Fried Rice • 92% confidence"*).
   - **🥗 Detected Ingredients**: Visible ingredients with chips (✅ Detected, ⚠️ Possibly Detected, ❓ Unable to Determine).
   - **🔥 Nutrition Dashboard**: Circular macros breakdown, progress bars for Calories, Protein, Carbohydrates, Fat, Fiber, Sugar, and Sodium; Vitamins (A, B, C, D, E, K); Minerals (Calcium, Iron, Magnesium, Potassium, Zinc).
   - **💚 Health Benefits**: Evidence-based functional contributions.
   - **⚠️ Possible Concerns**: Allergen and portion moderation notes.
   - **👥 Who Can Eat This?**: Dedicated suitability cards for Kids 👶, Teen & Adult 🧑, Pregnancy 🤰, and Elderly 🧓.
   - **🤰 Pregnancy Mode**: Prominently highlights cautions (e.g., Unripe Papaya latex warning, raw salad washing).
   - **🕐 Freshness Estimate**: Visual signs, confidence rating, and mandatory safety disclaimer.

5. **🥗 Diet Balance Module**
   - Daily food logs categorized by **🌅 Breakfast**, **☀️ Lunch**, **🍎 Snack**, and **🌙 Dinner**.
   - Add, edit, and delete meal entries.
   - Daily nutrition balance targets and water tracking.
   - Real-time **Personalized Balance Insights** (🟢 Good variety, 💡 suggestions to add protein, veggies, or fruits) without restrictive diet or calorie-deficit promotion.
   - **Weekly Diet Overview** with 7-day caloric trend charts and food group diversity scores.

6. **Sample Food Database (27 Core Items)**
   - **Fruits**: Apple, Banana, Papaya, Mango, Orange, Grapes, Watermelon.
   - **Vegetables**: Tomato, Onion, Carrot, Potato, Cucumber, Capsicum, Green Peas.
   - **Nuts & Dry Fruits**: Almond, Cashew, Dates, Raisins, Walnut.
   - **Prepared & Staple Foods**: Rice, Idli, Dosa, Chapati, Fried Rice, Vegetable Curry, Salad, Sandwich.

7. **Packaged Food OCR Mode**
   - Extracts product names, ingredient lists, nutrition facts, and declared allergens.
   - Distinguishes between explicit printed percentages vs. unavailable figures (*"Percentage not available from the label"*).
   - Expiry date validation with status (🟢 Valid, 🟡 Near Expiry, 🔴 Expired).

---

## 🏗️ Project Architecture

```
NutriScan/
├── backend/                  # Python FastAPI + SQLite
│   ├── main.py               # Application entry point with CORS & static mounting
│   ├── database.py           # SQLite connection & SQLAlchemy session
│   ├── models.py             # User, Food, Ingredient, Suitability, ScanHistory, MealLog
│   ├── schemas.py            # Pydantic request/response validation schemas
│   ├── auth.py               # JWT generation & bcrypt password verification
│   ├── routers/
│   │   ├── auth.py           # POST /auth/register, POST /auth/login
│   │   ├── profile.py        # GET /profile, PUT /profile
│   │   ├── foods.py          # GET /foods, GET /foods/{id}, POST /food/analyze, POST /food/ingredients
│   │   ├── scan.py           # POST /food/scan, POST /food/freshness, POST /food/ocr, GET /history
│   │   └── meals.py          # POST /meals, GET /meals, GET /meals/weekly, DELETE /meals/{id}
│   ├── services/
│   │   └── ai_services.py    # Modular Mock AI Services (Recognition, Freshness, OCR, Ingredients)
│   ├── data/
│   │   ├── seed_data.py      # Complete USDA-based dataset for all 27 foods
│   │   └── seeder.py         # Database seeder function executed on startup
│   └── requirements.txt
│
└── frontend/                 # React 18 + Vite + Tailwind CSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx           # React Router v6 configuration & protected routes
        ├── components/       # 14 Reusable UI components
        ├── pages/            # 13 Full application pages
        ├── data/             # Comprehensive 27-food master dataset & OCR samples
        ├── store/            # Zustand stores with persistent localStorage
        └── services/         # Axios API clients
```

---

## 🚀 Running the Application

### 1. Backend Setup (FastAPI)

```bash
cd backend

# 1. Create a virtual environment (optional but recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# 2. Install requirements
pip install -r requirements.txt

# 3. Start the FastAPI server
uvicorn main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`
- The SQLite database `nutriscan.db` is auto-created and pre-seeded on first run.

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🛡️ Mandated Safety Disclaimers

- **General**: *"NutriScan AI provides educational nutrition information and AI-based estimates. It is not a medical diagnosis or a replacement for professional medical advice."*
- **Pregnancy**: *"Pregnancy-related food guidance should be verified with a qualified healthcare professional."*
- **Freshness**: *"Freshness is an image-based estimate and cannot guarantee that food is safe to eat."*
- **Ingredient Detection**: *"Ingredient detection is an AI-based estimate. Verify ingredients manually when accuracy is important."*
- **Integrity Guarantee**: Never invents hidden ingredients (oil, salt, sugar, preservatives) or unsupported percentages without reliable data.
