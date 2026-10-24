@echo off
title Safar & Saloon - Dual Retro Radio
cd /d "%~dp0"

echo ==============================================================================
echo                      SAFAR & SALOON - DUAL RETRO RADIO
echo         Bus Driver (Highway Cabin) & Deluxe Saloon (Barbershop Lounge)
echo ==============================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [NOTICE] Node.js is not found in system PATH. Checking Python...
    where python >nul 2>nul
    if %errorlevel% equ 0 (
        echo [INFO] Running via Python HTTP server on port 3000...
        start "" powershell -NoProfile -Command "Start-Sleep -Milliseconds 800; Start-Process 'http://localhost:3000'"
        python -m http.server 3000
        pause
        exit /b
    )
    echo [ERROR] Neither Node.js nor Python was detected.
    echo Please install Node.js from https://nodejs.org/ to run Safar & Saloon.
    echo.
    pause
    exit /b
)

:: 2. Launch browser automatically
echo [INFO] Starting Safar & Saloon web server...
echo [INFO] Opening http://localhost:3000 in your default browser...
echo.
echo ==============================================================================
echo  Safar & Saloon is now running!
echo  URL: http://localhost:3000
echo.
echo  Keyboard Shortcuts:
echo   - Spacebar : Play / Pause
echo   - S        : Switch Mode (Bus Driver ^<-^> Deluxe Saloon)
echo   - H        : Pressure Air Horn / Scissor Snip
echo   - D / -^>   : Next Track
echo   - A / ^<-   : Previous Track
echo   - M        : Mute / Unmute
echo.
echo  Keep this window open while listening.
echo  To STOP the server, close this window or press Ctrl + C.
echo ==============================================================================
echo.

:: Launch default web browser
start "" powershell -NoProfile -Command "Start-Sleep -Milliseconds 800; Start-Process 'http://localhost:3000'"

:: Run server
node server.js

pause
