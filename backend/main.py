from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from database import engine, Base, SessionLocal
from data.seeder import seed_database
import os
from pathlib import Path

from routers import auth, profile, foods, scan, meals

# Create all database tables
Base.metadata.create_all(bind=engine)

# Seed database on startup
db = SessionLocal()
seed_database(db)
db.close()

app = FastAPI(title="NutriScan AI", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include API routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(foods.router)
app.include_router(scan.router)
app.include_router(meals.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "app": "NutriScan AI", "version": "1.0.0"}

@app.get("/api/info")
def api_info():
    return {"message": "NutriScan AI API", "version": "1.0.0", "status": "running"}

# Resolve frontend dist folder for unified deployment
CURRENT_DIR = Path(__file__).resolve().parent
FRONTEND_DIST = CURRENT_DIR.parent / "frontend" / "dist"
ASSETS_DIR = FRONTEND_DIST / "assets"
INDEX_HTML = FRONTEND_DIST / "index.html"

if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

# Single-Page Application (SPA) Fallback
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Check if a specific file exists in dist (e.g. favicon, manifest)
    file_path = FRONTEND_DIST / full_path
    if full_path and file_path.is_file():
        return FileResponse(file_path)
    
    # Otherwise fallback to index.html for client-side routing
    if INDEX_HTML.exists():
        return FileResponse(INDEX_HTML)
    
    return JSONResponse(
        content={"message": "NutriScan AI API running. Frontend not built yet.", "status": "running"},
        status_code=200
    )
