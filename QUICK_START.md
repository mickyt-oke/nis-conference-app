# Quick Start - Admin Authentication Setup

## 1️⃣ Configure Email (5 minutes)

### Option A: Mailtrap (Recommended for Development)

1. Sign up at https://mailtrap.io
2. Go to Demo Inbox → SMTP settings
3. Copy the credentials
4. Update `backend/.env`:

```bash
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS="noreply@nisconference.gov.ng"
MAIL_FROM_NAME="NIS Conference System"
```

5. Test the connection:
```bash
cd backend
php artisan tinker
```

Then in tinker:
```php
Mail::raw('Test email', function($mail) {
  $mail->to('test@example.com');
});
```

### Option B: Gmail (Production)

1. Enable 2FA on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Update `backend/.env`:

```bash
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## 2️⃣ Test Admin Registration (2 minutes)

1. Open your browser: `http://localhost:3000/admin/signup`
2. Fill in the form:
   - Name: Test Admin
   - Email: test@example.com
   - Password: SecurePass123!
   - Confirm: SecurePass123!
3. Click "Create Admin Account"
4. Check email inbox for verification link
5. Click verification link
6. You should see "Email verified successfully"

## 3️⃣ Test Password Reset (2 minutes)

1. Go to: `http://localhost:3000/login`
2. Click "Forgot password?"
3. Enter your email: test@example.com
4. Click "Send Reset Link"
5. Check email for reset link
6. Click link
7. Enter new password: NewSecurePass123!
8. Confirm password
9. Click "Reset Password"
10. Login with new password

## 4️⃣ Test Role-Based Access (1 minute)

The system automatically assigns `role: 'admin'` to new admin registrations.

Protected routes:
```
GET  /api/admin/dashboard (requires role:admin)
POST /api/logout (requires auth:api)
GET  /api/me (requires auth:api)
```

## 📋 Checklists

### Password Requirements
- ✅ At least 10 characters
- ✅ At least one UPPERCASE letter
- ✅ At least one lowercase letter
- ✅ At least one NUMBER (0-9)
- ✅ At least one SPECIAL character (@$!%*?&)

### Email Token Expiration
- ✅ Verification tokens: 24 hours
- ✅ Reset tokens: 1 hour

## 🔧 Useful Commands

```bash
# Run migrations
php artisan migrate

# Clear config cache
php artisan config:clear

# Check logs
tail -f storage/logs/laravel.log

# Database check
php artisan tinker
User::all();

# Test email sending
php artisan tinker
$user = User::first();
$user->notify(new App\Notifications\VerifyEmailNotification('test-token'));
```

## 🚨 Common Issues

### Email Not Sending
1. Check SMTP credentials in `.env`
2. Run: `php artisan config:clear`
3. Check logs: `storage/logs/laravel.log`

### "Invalid or expired token"
- Verification tokens expire after 24 hours
- Reset tokens expire after 1 hour
- Request new ones if expired

### CORS Errors
- Check `config/cors.php`
- Ensure `http://localhost:3000` is in allowed origins

### Weak Password Error
- Password must have: uppercase + lowercase + number + special character
- Minimum 10 characters
- Special characters: @$!%*?&

## 📧 Email Testing (Mailtrap)

1. Go to Mailtrap Dashboard
2. Click "Demo Inbox"
3. You'll see all test emails sent
4. Click email to view full content
5. Check headers, body, attachments

## 🔐 Security Notes

- Never commit `.env` to git
- Tokens are unique and non-reusable
- Passwords are bcrypt hashed
- Sensitive fields hidden from API responses
- API uses JWT authentication for protected routes

## 📚 Full Documentation

See `AUTHENTICATION_SETUP.md` for:
- Complete API endpoint documentation
- All configuration options
- Troubleshooting guide
- Production deployment checklist

## 🎯 Next Steps

1. ✅ Configure SMTP (you're here)
2. Test admin registration
3. Test email verification
4. Test password reset
5. Create admin dashboard
6. Implement user management
7. Deploy to production

---

**Need Help?**
Check `AUTHENTICATION_SETUP.md` or `AUTH_IMPLEMENTATION_SUMMARY.md` for detailed information.
