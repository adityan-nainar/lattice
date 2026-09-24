@echo off
rem Double-click to start Stack and open it in your browser. Close this window to stop.
cd /d "%~dp0"
if not exist "..\lattice\node_modules" (
  echo Installing the Lattice engine...
  pushd "..\lattice"
  call npm install || (popd & pause & exit /b 1)
  popd
)
node --import ./env.js ../lattice/server.js --open
pause
