@echo off
IF NOT EXIST node_modules ( npm install )
npm run sound
