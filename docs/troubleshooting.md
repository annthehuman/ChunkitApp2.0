# Troubleshooting Guide

## Common Issues & Solutions

### Windows Users: Line Ending Issues

If you see errors like `exec /scripts/run.sh: no such file or directory` or `/run.sh: not found`, this is caused by Windows line endings (CRLF) in shell scripts. Here's how to fix it:

**Step 1: Fix Git Configuration**
```bash
# Configure Git to not convert line endings on Windows
git config --global core.autocrlf input
```

**Step 2: Re-clone or Reset Repository**
```bash
# Option A: Fresh clone (recommended)
cd ..
rm -rf ChunkitApp2.0
git clone https://github.com/annthehuman/ChunkitApp2.0.git
cd ChunkitApp2.0

# Option B: Reset existing repository
git rm --cached -r .
git reset --hard
```

**Step 3: Convert Existing Script Line Endings** (if you prefer not to re-clone)
```bash
# On Windows with Git Bash or WSL:
dos2unix scripts/run.sh proxy/run.sh proxy/certbot/certify-init.sh entrypoint.sh

# Or manually with PowerShell:
(Get-Content scripts/run.sh -Raw) -replace "`r`n","`n" | Set-Content scripts/run.sh -NoNewline
(Get-Content proxy/run.sh -Raw) -replace "`r`n","`n" | Set-Content proxy/run.sh -NoNewline
```

**Step 4: Rebuild Docker Images**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

**Why This Happens:**
Windows Git automatically converts line endings:
- **LF** (`\n`) = Unix/Linux line ending
- **CRLF** (`\r\n`) = Windows line ending

When shell scripts have CRLF endings, Linux sees the shebang as `#!/bin/sh\r` (with an invisible `\r` character), which doesn't exist, causing the "no such file or directory" error.

The `.gitattributes` file now forces all `.sh` files to always use LF endings, even on Windows.

### Missing .env File

If you see warnings about missing environment variables, create a `.env` file:

```bash
# Create .env file in project root
cat > .env << 'EOF'
SECRET_KEY=your-secret-key-here
DEBUG=1
ALLOWED_HOSTS=127.0.0.1,localhost
EOF
```

Generate a secret key at: https://djecrety.ir/

### Permission Issues (Linux/Mac)

If you encounter permission errors:
```bash
chmod +x scripts/run.sh
chmod +x proxy/run.sh
chmod +x entrypoint.sh
chmod +x proxy/certbot/certify-init.sh
```

### Database Permissions

```bash
# Fix SQLite permissions in Docker
chmod 777 /vol/web/db.sqlite3
chown app:app /vol/web/db.sqlite3
```

### Media File Upload Issues

```bash
# Ensure media directory permissions
chmod -R 777 /vol/web/media
mkdir -p /vol/web/media/Practice
mkdir -p /vol/web/media/Experement
```

### Audio File Extraction Problems

- Ensure ZIP files don't contain nested folders beyond one level
- Audio files should be directly in ZIP or one folder deep
- Avoid system files like `__MACOSX` folders

### CORS Issues

- Verify `CORS_ORIGIN_WHITELIST` includes your frontend URL
- Check `ALLOWED_HOSTS` includes your domain

### Email & Signup Issues

```bash
# In development (DEBUG=1): Activation emails print to Docker logs
docker logs --tail 50 chunkitapp20-app-1

# In production: Check email credentials are set correctly
# Verify EMAIL_HOST_PASSWORD environment variable is set
# Use Gmail App Password (requires 2FA enabled on Gmail account)
```

**Find Activation Emails in Logs:**
```bash
# View all app logs
docker-compose logs app

# Search specifically for activation emails
docker-compose logs app | grep -A 20 "activation"

# Follow logs in real-time
docker-compose logs -f app
```

**Common Issues:**
- **Cannot log in after signup**: Account needs activation (check logs for activation link)
- **Activation link expired**: Register again or contact administrator
- **Email not sent in production**: Check SMTP configuration in environment variables

**Reset or Create Test Account:**
```bash
# If running with docker-compose (production compose)
docker compose exec app python manage.py shell -c "from django.contrib.auth.models import User; u, _ = User.objects.get_or_create(username='test@chunkit.app', defaults={'email':'test@chunkit.app'}); u.set_password('test1234'); u.is_active=True; u.save(); print('Password reset or user created!')"

# If running with docker-compose (legacy command name)
docker-compose exec app python manage.py shell -c "from django.contrib.auth.models import User; u, _ = User.objects.get_or_create(username='test@chunkit.app', defaults={'email':'test@chunkit.app'}); u.set_password('test1234'); u.is_active=True; u.save(); print('Password reset or user created!')"

# If running locally without Docker
python manage.py shell -c "from django.contrib.auth.models import User; u, _ = User.objects.get_or_create(username='test@chunkit.app', defaults={'email':'test@chunkit.app'}); u.set_password('test1234'); u.is_active=True; u.save(); print('Password reset or user created!')"
```

## Logging & Debugging

### Enable Debug Logging

```python
# In settings.py for development
DEBUG = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

### Frontend Debugging

```bash
# Enable React development mode
npm run dev

# Check browser developer console for errors
# Verify API endpoints in Network tab
```

## Performance Issues

### Large Dataset Handling

- Permutation tests with 1M+ iterations may take 8+ hours
- Consider reducing permutation count for faster results
- Monitor memory usage during Monte Carlo simulations

## Still Having Issues?

1. **Make sure Docker Desktop is running**
2. **Check if ports 80/443 are available** (not used by other applications)
3. **Try running Docker as Administrator**
4. **Check Docker logs**: `docker-compose logs app`
