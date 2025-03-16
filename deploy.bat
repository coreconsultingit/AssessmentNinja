@echo off

:: Navigate to React app folder
cd dotnet-interview-react

:: Build the React app
echo Building React app...
npm run build

:: Navigate back to root directory
cd ..

:: Remove existing static files in the root directory (except dotnet-interview-react folder)
echo Cleaning up old files in root directory...
for /D %%d in (*) do (
    if not "%%d"=="dotnet-interview-react" (
        rmdir /S /Q "%%d"
    )
)
for %%f in (*) do (
    if not "%%f"=="deploy.bat" (
        del "%%f"
    )
)

:: Move React build files from dist folder to root directory
echo Moving new build files to root directory...
xcopy /E /I /Y dotnet-interview-react\dist\* .

:: Commit and push changes to GitHub
echo Committing and pushing changes...
git add .
git commit -m "Deploy React app"
git push origin main

echo Deployment complete!
pause
