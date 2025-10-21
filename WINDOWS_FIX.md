# Windows Docker Fix Guide

## Problem
Getting errors like:
- `exec /scripts/run.sh: no such file or directory`
- `/run.sh: not found`
- `d38 variable is not set`

## Root Cause
Git on Windows converts Unix line endings (LF) to Windows line endings (CRLF), which breaks shell scripts in Linux Docker containers.

## Solution

### Option 1: Quick Fix (Recommended)

Run these commands in **Git Bash** or **PowerShell** from your project directory:

```bash
# 1. Configure Git to preserve line endings
git config core.autocrlf input
git config core.eol lf

# 2. Remove all files from Git index
git rm --cached -r .

# 3. Reset to restore files with correct line endings
git reset --hard HEAD

# 4. Create .env file if missing
echo "SECRET_KEY=django-insecure-test-key-change-in-production" > .env
echo "DEBUG=1" >> .env
echo "ALLOWED_HOSTS=127.0.0.1,localhost" >> .env

# 5. Clean and rebuild Docker
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Option 2: Manual PowerShell Fix

If Option 1 doesn't work, manually convert line endings with PowerShell:

```powershell
# Convert all shell scripts to LF line endings
$files = @(
    "scripts\run.sh",
    "proxy\run.sh", 
    "proxy\certbot\certify-init.sh",
    "entrypoint.sh"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [IO.File]::ReadAllText($file) -replace "`r`n", "`n"
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [IO.File]::WriteAllText($file, $content, $utf8NoBom)
        Write-Host "Fixed: $file"
    }
}

# Create .env file
@"
SECRET_KEY=django-insecure-test-key-change-in-production
DEBUG=1
ALLOWED_HOSTS=127.0.0.1,localhost
"@ | Out-File -FilePath .env -Encoding ASCII -NoNewline

# Rebuild Docker
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Option 3: Fresh Clone (If all else fails)

```bash
# 1. Configure Git globally
git config --global core.autocrlf input
git config --global core.eol lf

# 2. Delete and re-clone
cd ..
rm -rf ChunkitApp2.0
git clone https://github.com/annthehuman/ChunkitApp2.0.git
cd ChunkitApp2.0

# 3. Create .env file
cat > .env << 'EOF'
SECRET_KEY=django-insecure-test-key-change-in-production
DEBUG=1
ALLOWED_HOSTS=127.0.0.1,localhost
EOF

# 4. Build and run
docker-compose build
docker-compose up
```

## Verification

After fixing, you should see:
```
✔ Container chunkitapp20-db-1       Started
✔ Container chunkitapp20-app-1      Started  
✔ Container chunkitapp20-proxy-1    Started
✔ Container chunkitapp20-certbot-1  Started
```

No more "exec" or "not found" errors!

## Access the Application

Once running successfully:
- Open browser to: http://127.0.0.1
- Login with test account:
  - Email: test@chunkit.app
  - Password: test1234

## Why This Happens

Windows Git automatically converts line endings:
- **LF** (`\n`) = Unix/Linux line ending
- **CRLF** (`\r\n`) = Windows line ending

When shell scripts have CRLF endings, Linux sees the shebang as `#!/bin/sh\r` (with an invisible `\r` character), which doesn't exist, causing the "no such file or directory" error.

The `.gitattributes` file now forces all `.sh` files to always use LF endings, even on Windows.

## Still Having Issues?

1. **Make sure Docker Desktop is running**
2. **Check if ports 80/443 are available** (not used by other applications)
3. **Try running Docker as Administrator**
4. **Check Docker logs**: `docker-compose logs app`

