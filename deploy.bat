@echo off

:: Navigate to React app folder
cd assessment-react

:: Build the React app
echo Building React app...
npm run build

:: Navigate back to root directory
cd ..

:: Remove all existing files in the root directory (except deploy.bat)
echo Cleaning up old files in root directory...
for /D %%d in (*) do (
    if not "%%d"=="assessment-react" (
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
xcopy /E /I /Y assessment-react\dist\* .
xcopy /Y assessment-react\dist\.nojekyll .

:: Commit and push changes to GitHub
echo Committing and pushing changes...
git add .
git commit -m "Deploy React app"
git push origin main

echo Deployment complete!
pause
