@echo off
echo Starting NextIn Backend Server...
echo.
echo Checking Node.js installation...
node --version
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b
)
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
node server.js
pause
