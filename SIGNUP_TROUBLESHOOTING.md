# Admin Signup Troubleshooting Guide

## Quick Fix Checklist

### 1. ✅ Verify Backend Server is Running
```powershell
cd c:\next-app-complete\backend
php artisan serve
```
Expected output: `Server started on [http://127.0.0.1:8000]`

### 2. ✅ Verify Frontend Server is Running
```powershell
cd c:\next-app-complete
npm run dev
```
Expected output: `- Local: http://localhost:3000`

### 3. ✅ Test the API Endpoint Directly

Open the test file in your browser:
```
file:///c:/next-app-complete/test-admin-register.html
```

Or use curl:
```powershell
curl -X POST http://localhost:8000/api/admin/register `
  -H "Content-Type: application/json" `
  -H "Accept: application/json" `
  -d '{\"name\":\"Test Admin\",\"email\":\"test@example.com\",\"password\":\"Admin@123456\",\"password_confirmation\":\"Admin@123456\"}'
```

### 4. ✅ Check Route is Registered
```powershell
cd backend
php artisan route:list | Select-String "admin/register"
```
Expected: `POST api/admin/register`

### 5. ✅ Clear Laravel Caches
```powershell
cd backend
php artisan config:clear
php artisan route:clear
php artisan cache:clear
```

## Common Errors and Solutions

### Error: "Network error" or "Failed to fetch"

**Cause:** Backend server not running or wrong URL

**Solution:**
1. Start backend server: `cd backend && php artisan serve`
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Error: "CORS policy" error

**Cause:** CORS not configured properly

**Solution:**
1. Check `backend/.env` has:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
2. Verify `backend/config/cors.php`:
   ```php
   'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
   'supports_credentials' => true,
   ```

### Error: "419 CSRF token mismatch"

**Cause:** CSRF protection enabled for API routes

**Solution:**
Verify `backend/bootstrap/app.php` has:
```php
$middleware->validateCsrfTokens(except: [
    'api/*',
]);
```

### Error: "422 Unprocessable Entity"

**Cause:** Validation failed

**Common validation errors:**
- Email already exists
- Password doesn't meet requirements (10+ chars, uppercase, lowercase, number, special char)
- Password confirmation doesn't match

**Solution:**
Check the error response for specific field errors. The frontend will display them.

### Error: "500 Internal Server Error"

**Cause:** Server-side exception

**Solution:**
1. Check Laravel logs:
   ```powershell
   Get-Content backend\storage\logs\laravel.log -Tail 50
   ```

2. Common causes:
   - Database not configured
   - Mail configuration issue
   - Missing `.env` variables

## API Endpoint Details

### POST /api/admin/register

**URL:** `http://localhost:8000/api/admin/register`

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "Admin@123456",
  "password_confirmation": "Admin@123456"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": 1,
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Validation Error Response (422):**
```json
{
  "errors": {
    "email": ["This email is already registered."],
    "password": ["Password must contain uppercase, lowercase, number, and special character."]
  }
}
```

**Server Error Response (500):**
```json
{
  "success": false,
  "message": "Registration failed: [error details]"
}
```

## Password Requirements

✅ Minimum 10 characters
✅ At least one uppercase letter (A-Z)
✅ At least one lowercase letter (a-z)
✅ At least one number (0-9)
✅ At least one special character (@$!%*?&)

**Valid Examples:**
- `Admin@123456`
- `MyPassword1!`
- `Secure$Pass99`

**Invalid Examples:**
- `admin123` (no uppercase, no special char)
- `Admin@123` (too short)
- `ADMIN@123456` (no lowercase)

## Testing Steps

### 1. Test with HTML Form
1. Open `test-admin-register.html` in browser
2. Fill in the form (default values are pre-filled)
3. Click "Test Registration"
4. Check the response

### 2. Test from Frontend
1. Navigate to `http://localhost:3000/admin/signup`
2. Fill in the form with valid data
3. Click "Create Admin Account"
4. Should see success message

### 3. Check Database
```powershell
cd backend
php artisan tinker
```
Then in tinker:
```php
User::latest()->first()
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Mail (for email verification)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
```

## Files Modified

### ✅ Backend Files
- `backend/routes/api.php` - Contains admin registration route
- `backend/app/Http/Controllers/Api/AdminAuthController.php` - Registration logic
- `backend/bootstrap/app.php` - CSRF exclusion for API routes
- `backend/config/cors.php` - CORS configuration

### ✅ Frontend Files
- `app/admin/signup/page.tsx` - Admin signup form component

## Next Steps After Successful Registration

1. **Email Verification:**
   - Check email for verification link
   - Click link to verify account
   - Or visit: `http://localhost:3000/verify-email?token=XXX&email=YYY`

2. **Login:**
   - Navigate to `http://localhost:3000/login`
   - Use registered email and password
   - Should redirect to dashboard

3. **Test Password Reset:**
   - Go to `http://localhost:3000/forgot-password`
   - Enter registered email
   - Check email for reset link

## Support

If issues persist:
1. Check Laravel logs: `backend/storage/logs/laravel.log`
2. Check browser console for JavaScript errors
3. Check network tab in browser DevTools
4. Verify all environment variables are set correctly
5. Ensure database connection is working

## Quick Commands Reference

```powershell
# Start backend server
cd backend
php artisan serve

# Start frontend server
cd .
npm run dev

# Clear all caches
cd backend
php artisan optimize:clear

# Check routes
php artisan route:list | Select-String "admin"

# Check database connection
php artisan tinker
DB::connection()->getPdo()

# View latest log entries
Get-Content backend\storage\logs\laravel.log -Tail 50
```
