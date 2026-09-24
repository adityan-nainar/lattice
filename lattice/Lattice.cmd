@echo off
rem Double-click to start Lattice and open it in your browser. Close this window to stop.
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm install || (pause & exit /b 1)
)
node server.js --open
pause
