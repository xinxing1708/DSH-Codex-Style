@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required. Install Node.js, then run this file again.
  pause
  exit /b 1
)
node scripts\install.mjs
if errorlevel 1 (
  echo Installation failed. Read the message above before trying again.
  pause
  exit /b 1
)
echo Installation complete. Restart DSH when convenient.
pause
