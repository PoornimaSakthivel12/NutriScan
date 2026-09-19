@echo off
title NutriScan AI - Full Stack Server
echo ========================================================
echo        🥗 NutriScan AI - Full Stack Deployment
echo ========================================================
echo Starting unified server on http://localhost:8080 ...
echo.

cd /d "%~dp0backend"
start "" http://localhost:8080
py -m uvicorn main:app --host 127.0.0.1 --port 8080

pause
