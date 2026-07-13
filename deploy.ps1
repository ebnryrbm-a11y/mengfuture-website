$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  MengFuture Website Deploy Script v1.0" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = $MyInvocation.MyCommand.Path
$projectDir = Split-Path $scriptPath -Parent
Set-Location $projectDir
Write-Host "[OK] Working directory: $projectDir" -ForegroundColor Green

$gitPath = "C:\Program Files\Git\bin\git.exe"
$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (-not (Test-Path $gitPath)) {
    Write-Host "[ERROR] Git not found: $gitPath" -ForegroundColor Red
    Write-Host "Please install Git first: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Git found: $gitPath" -ForegroundColor Green

if (-not (Test-Path $npmPath)) {
    Write-Host "[ERROR] npm not found: $npmPath" -ForegroundColor Red
    Write-Host "Please install Node.js first: https://nodejs.org/download/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] npm found: $npmPath" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

if (-not (Test-Path "$projectDir\node_modules")) {
    Write-Host "Installing npm dependencies..."
    & $npmPath install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[OK] Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 2: Deleting dynamic routes..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

$dirsToDelete = @(
    "$projectDir\src\app\api",
    "$projectDir\src\app\admin",
    "$projectDir\src\app\cases\[id]",
    "$projectDir\src\app\services\[id]"
)

foreach ($dir in $dirsToDelete) {
    if (Test-Path $dir) {
        Remove-Item -Path $dir -Recurse -Force
        Write-Host "[OK] Deleted: $dir" -ForegroundColor Green
    } else {
        Write-Host "[OK] Already deleted: $dir" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 3: Building static website..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

$nextPath = "$projectDir\node_modules\.bin\next.cmd"

if (-not (Test-Path $nextPath)) {
    Write-Host "[ERROR] next not found: $nextPath" -ForegroundColor Red
    Write-Host "Run: npm install" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

$env:DEPLOY_TARGET = "github"
& $nextPath build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Static website built successfully" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 4: Preparing gh-pages branch..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

& $gitPath checkout main
Write-Host "[OK] Switched to main branch" -ForegroundColor Green

& $gitPath branch -D gh-pages 2>$null
Write-Host "[OK] Removed old gh-pages branch" -ForegroundColor Green

& $gitPath checkout --orphan gh-pages
Write-Host "[OK] Created new gh-pages branch" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 5: Cleaning and copying files..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

Write-Host "Deleting all files..."
& $gitPath rm -rf .

Write-Host "Copying build output..."
Copy-Item -Path "out\*" -Destination "." -Recurse -Force

Write-Host "Cleaning temporary files..."
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
if (Test-Path "out") { Remove-Item -Path "out" -Recurse -Force }
if (Test-Path ".env") { Remove-Item -Path ".env" -Force }
if (Test-Path "node_modules") { Remove-Item -Path "node_modules" -Recurse -Force }

Write-Host "[OK] Build artifacts ready" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 6: Committing changes..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

& $gitPath add .
& $gitPath commit -m "Deploy to GitHub Pages $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "[OK] Changes committed" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

& $gitPath push origin gh-pages --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Push failed" -ForegroundColor Yellow
    Write-Host "Try manually: git push origin gh-pages --force" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop to push gh-pages branch" -ForegroundColor Yellow
} else {
    Write-Host "[OK] Push successful" -ForegroundColor Green
}

Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Gray
Write-Host "Step 8: Switching back to main..." -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Gray

& $gitPath checkout main
Write-Host "[OK] Switched back to main branch" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configure GitHub Pages:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/ebnryrbm-a11y/mengfuture-website/settings/pages" -ForegroundColor Yellow
Write-Host "  2. Source: gh-pages branch / (root) folder" -ForegroundColor Yellow
Write-Host "  3. Save and wait a few minutes" -ForegroundColor Yellow
Write-Host ""
Write-Host "Website: https://ebnryrbm-a11y.github.io/mengfuture-website/" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"
