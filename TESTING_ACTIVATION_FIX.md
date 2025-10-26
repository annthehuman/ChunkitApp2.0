# Testing Guide: Activation & Login Fixes

## What Was Fixed

### Issue 1: Activation Endpoint Connection Refused
**Problem:** When users clicked activation links, they got:
```
ConnectionError: HTTPConnectionPool(host='localhost', port=80): Max retries exceeded
```

**Root Cause:** The activation view was trying to POST to `http://localhost:80/auth/users/activation/` from inside the Docker container, but the app runs on `app:9000` internally.

**Fix:** Updated `chunkitapp/views.py` to use the internal Docker service (`http://app:9000`) in production and the external URL in development mode.

### Issue 2: Password Reset Command Failed
**Problem:** The reset command failed with:
```
django.core.exceptions.ImproperlyConfigured: Requested setting INSTALLED_APPS, but settings are not configured
```

**Root Cause:** Using `python -c` directly doesn't load Django settings.

**Fix:** Updated README to use `python manage.py shell -c` which properly initializes Django.

---

## Pre-Testing Checklist

Before your Windows user tests, ensure:

1. ✅ `.env` file exists with valid `SECRET_KEY`
   ```env
   DEBUG=1
   SECRET_KEY=your-secret-key-here
   ALLOWED_HOSTS=127.0.0.1,localhost
   ```

2. ✅ Docker containers rebuilt and running:
   ```bash
   docker-compose down
   docker-compose build
   docker-compose up -d
   ```

3. ✅ Test account exists and is active:
   ```bash
   docker-compose exec app python manage.py shell -c "from django.contrib.auth.models import User; u, _ = User.objects.get_or_create(username='test@chunkit.app', defaults={'email':'test@chunkit.app'}); u.set_password('test1234'); u.is_active=True; u.save(); print('Ready!')"
   ```

---

## Test Cases

### ✅ Test 1: Login with Existing User
**Expected:** Should work without errors

```bash
# Test login endpoint
curl -X POST http://localhost/auth/jwt/create/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test@chunkit.app","password":"test1234"}'
```

**Expected Output:**
```json
{
  "refresh": "eyJ0eXAi...",
  "access": "eyJ0eXAi..."
}
```

**Status on Mac:** ✅ PASSED

---

### ✅ Test 2: Activation Endpoint Redirect
**Expected:** Should redirect to `/authorized` without connection errors

```bash
curl -I http://localhost/auth/activate/MQ/test-token-123
```

**Expected Output:**
```
HTTP/1.1 302 Found
Location: /authorized
```

**Status on Mac:** ✅ PASSED (no more "Connection refused" errors)

---

### ✅ Test 3: User Registration & Activation Flow

**Step 1: Register New User**

In browser or via API:
- Navigate to: http://localhost/signup/
- Fill in email/password
- Submit registration

**Step 2: Get Activation Link from Logs**

Since DEBUG=1, activation emails print to console:
```bash
docker-compose logs app | grep -A 20 "activation"
```

Look for output like:
```
Subject: Account activation on localhost
...
http://localhost/auth/activate/MQ/cy0ide-7e2af9df436df16035a7361566ec22ae
```

**Step 3: Click Activation Link**

Copy the activation URL and open in browser. Should:
1. ✅ Redirect to `/authorized` page
2. ✅ NOT show "Connection refused" error
3. ✅ User can now log in

---

### ✅ Test 4: Password Reset (Using Fixed Command)

If the test user gets locked out:

```bash
# Windows (Command Prompt)
docker-compose exec app python manage.py shell -c "from django.contrib.auth.models import User; u, _ = User.objects.get_or_create(username='test@chunkit.app', defaults={'email':'test@chunkit.app'}); u.set_password('test1234'); u.is_active=True; u.save(); print('Password reset!')"

# Windows (PowerShell) - same command
# Mac/Linux - same command
```

**Expected Output:**
```
Password reset!
```

**Status on Mac:** ✅ PASSED

---

## Environment-Specific Behavior

### Development Mode (DEBUG=1)
- Activation emails print to Docker logs
- Activation POST uses `request.build_absolute_uri()` (includes port)
- No SMTP credentials needed

### Production Mode (DEBUG=0)
- Activation emails sent via SMTP
- Activation POST uses `http://app:9000` internally
- Requires EMAIL_HOST_PASSWORD in environment

---

## Troubleshooting for Windows User

### Issue: "Container is restarting"
**Solution:** Wait 10 seconds for containers to fully start
```bash
docker-compose ps
```

### Issue: "SECRET_KEY setting must not be empty"
**Solution:** Check `.env` file has valid SECRET_KEY
```bash
type .env    # Windows
cat .env     # Mac/Linux
```

### Issue: Activation link shows "Connection refused"
**Solution:** This was the original bug - ensure you're running the **updated code**:
1. Pull latest changes: `git pull`
2. Rebuild: `docker-compose build`
3. Restart: `docker-compose up -d`

### Issue: Can't find activation link
**Solution:** Check Docker logs in real-time
```bash
docker-compose logs -f app
```
Then register a new user in another terminal/browser

---

## Windows-Specific Testing Notes

### Line Ending Issues
If Windows user sees `/bin/sh: not found` errors, they need to fix line endings:
```bash
git config --global core.autocrlf input
git rm --cached -r .
git reset --hard
```

### Docker Commands
Windows users should use:
- **Command Prompt or PowerShell:** `docker-compose` (same as Mac)
- **Git Bash:** May need to prefix paths with `/` 

---

## Summary of Changes

### Files Modified
1. **`chunkitapp/views.py`** - Lines 23-42
   - Detects Docker production environment
   - Uses `http://app:9000` for internal activation POST
   - Falls back to external URL in DEBUG mode

2. **`README.md`** - Lines 828-843
   - Updated password reset instructions
   - Uses `manage.py shell -c` instead of raw Python
   - Includes commands for docker compose, docker-compose, and local Python

### What Should Work Now
✅ User signup and account activation  
✅ Login with test account  
✅ Password reset via command line  
✅ No more "Connection refused" errors  
✅ Works on both Windows and Mac  

---

## Validation Checklist for Windows User

Please test and confirm:

- [ ] Containers start without errors (`docker-compose up -d`)
- [ ] Login works with `test@chunkit.app` / `test1234`
- [ ] New user registration creates account
- [ ] Activation link from logs redirects to `/authorized` (no connection error)
- [ ] Activated user can log in successfully
- [ ] Password reset command works without "settings not configured" error

---

**Last tested on Mac:** October 21, 2025 ✅  
**Next step:** Windows user validation

