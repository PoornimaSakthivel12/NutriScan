@echo off
title NutriScan AI - Project Verification & Automated Tests
echo ========================================================
echo        🥗 NutriScan AI - Automated Verification
echo ========================================================
echo.
echo [1/2] Running Backend Pytest Test Suite...
cd /d "%~dp0backend"
py -m pytest test_main.py -v
if %errorlevel% neq 0 (
    echo [ERROR] Backend tests encountered issues.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/2] Verifying Frontend Production Build...
cd /d "%~dp0frontend"
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build encountered issues.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo  [SUCCESS] All 8 Backend Tests Passed & Frontend Built!
echo ========================================================
echo You can run the application with run_app.bat
echo.
pause
