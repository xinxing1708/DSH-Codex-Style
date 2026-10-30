@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required. Install Node.js, then run this file again.
  pause
  exit /b 1
)
if not exist "%~dp0scripts\install.mjs" (
  echo This folder does not contain scripts\install.mjs.
  echo Extract the whole ZIP first ^(right-click it, Extract All^), then run install.cmd from the extracted folder.
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
