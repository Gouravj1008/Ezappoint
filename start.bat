@echo off
echo ========================================
echo Starting NextIn Backend Server
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo.
echo Starting MongoDB check...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if errorlevel 1 (
    echo WARNING: MongoDB might not be running!
    echo Please start MongoDB before continuing.
    pause
)

echo.
echo Starting server...
echo Press Ctrl+C to stop the server
echo.
node server.js

pause
