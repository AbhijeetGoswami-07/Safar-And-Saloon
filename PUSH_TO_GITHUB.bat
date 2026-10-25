@echo off
title Safar & Saloon - Push & Sync to GitHub
cd /d "%~dp0"

echo ==============================================================================
echo                 SAFAR & SALOON - GIT & GITHUB CODE SYNC
echo ==============================================================================
echo.

:: 1. Locate Git Executable
set "GIT_EXE="
where git >nul 2>nul
if %errorlevel% equ 0 (
    set "GIT_EXE=git"
) else if exist "%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" (
    set "GIT_EXE=%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe"
) else if exist "%ProgramFiles%\Git\cmd\git.exe" (
    set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
) else if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" (
    set "GIT_EXE=%ProgramFiles(x86)%\Git\cmd\git.exe"
) else if exist "%USERPROFILE%\AppData\Local\Programs\Git\cmd\git.exe" (
    set "GIT_EXE=%USERPROFILE%\AppData\Local\Programs\Git\cmd\git.exe"
)

if "%GIT_EXE%"=="" (
    echo [ERROR] Git was not found on your system!
    echo Please install Git or ensure MinGit is available in your AppData folder.
    echo.
    pause
    exit /b 1
)

:: Export for helper script
set "GIT_EXE=%GIT_EXE%"

:: 2. Check for Node.js
where node >nul 2>nul
if %errorlevel% equ 0 (
    :: Run automated Node.js sync engine with smart commit formulation & bundle updates
    node scripts/git_sync.js %*
    echo.
    echo Press any key to close this window...
    pause >nul
    exit /b 0
)

:: 3. Pure Batch Fallback if Node.js is not in PATH
echo [NOTICE] Node.js not detected in PATH. Running pure Git sync...
echo.

echo [1/3] Adding changes to Git staging...
"%GIT_EXE%" add .

:: Check if there are changes to commit
"%GIT_EXE%" status --porcelain | findstr /r "." >nul
if %errorlevel% equ 0 (
    set "MSG=%*"
    if "%MSG%"=="" (
        set "MSG=chore: update project code and sync to GitHub [%date% %time%]"
    )
    echo [2/3] Committing changes with message: "!MSG!"
    "%GIT_EXE%" commit -m "!MSG!"
) else (
    echo [2/3] No new file modifications detected.
)

echo [3/3] Pushing to GitHub (origin/main)...
"%GIT_EXE%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ==============================================================================
    echo  SUCCESS! Project is synchronized with GitHub:
    echo  https://github.com/AbhijeetGoswami-07/Safar-And-Saloon
    echo ==============================================================================
) else (
    echo.
    echo [ERROR] Failed to push to GitHub. Please check your network connection.
)

echo.
echo Press any key to close this window...
pause >nul
