# NIS Conference App - Authentication & Email Setup Guide

## Configuration Overview

This guide covers the mail SMTP configuration, admin registration, email verification, and password reset functionality.

## Email Configuration (SMTP)

### Using Mailtrap (Recommended for Development)

1. **Sign up at Mailtrap** (https://mailtrap.io)

2. **Update `.env` file** in the backend directory:

```env
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_FROM_ADDRESS="noreply@nisconference.gov.ng"
MAIL_FROM_NAME="NIS Conference System"
```

### Using Gmail SMTP

For production or Gmail accounts:

```env
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password
MAIL_FROM_ADDRESS="noreply@nisconference.gov.ng"
MAIL_FROM_NAME="NIS Conference System"
```

**Note:** For Gmail, generate an [App Password](https://myaccount.google.com/apppasswords) instead of using your regular password.

### Using SendGrid

```env
MAIL_MAILER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
MAIL_FROM_ADDRESS="noreply@nisconference.gov.ng"
MAIL_FROM_NAME="NIS Conference System"
```

## Admin Registration & Authentication

### 1. Admin Signup Page

**Route:** `/admin/signup`

Features:
- Strong password validation (10+ chars, uppercase, lowercase, number, special char)
- Email uniqueness validation
- Automatic verification email sending
- Error handling with field-level validation

```bash
# Frontend page location
app/admin/signup/page.tsx
```

### 2. Email Verification

**Route:** `/verify-email?token={token}&email={email}`

Process:
- User receives verification email with secure token
- Verification token sent in email is valid for 24 hours
- User clicks link to verify email
- Account activation after successful verification

```bash
# Frontend page location
app/verify-email/page.tsx
```

### 3. Password Reset

#### Request Reset
**Route:** `/forgot-password`

```bash
# Frontend page location
app/forgot-password/page.tsx
```

#### Reset Password
**Route:** `/reset-password?token={token}&email={email}`

```bash
# Frontend page location
app/reset-password/page.tsx
```

Process:
- User requests password reset via email
- Reset token valid for 1 hour
- User receives email with secure reset link
- New password set with strong validation

## API Endpoints

### Admin Authentication

#### 1. Register Admin
```http
POST /api/admin/register
Content-Type: application/json

{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

Response:
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

#### 2. Verify Email
```http
POST /api/admin/verify-email
Content-Type: application/json

{
  "token": "verification_token_from_email",
  "email": "admin@example.com"
}
```

#### 3. Request Password Reset
```http
POST /api/admin/request-password-reset
Content-Type: application/json

{
  "email": "admin@example.com"
}
```

#### 4. Reset Password
```http
POST /api/admin/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "email": "admin@example.com",
  "password": "NewSecurePass123!",
  "password_confirmation": "NewSecurePass123!"
}
```

## Role-Based Access Control (RBAC)

### Middleware Implementation

The `RoleMiddleware` checks user roles and enforces access control:

```php
// In routes/api.php
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // Admin-only routes
});

Route::middleware(['auth:api', 'role:user'])->group(function () {
    // User-only routes
});

// Multiple roles
Route::middleware(['auth:api', 'role:admin|supervisor'])->group(function () {
    // Admin or Supervisor routes
});
```

### Available Roles

1. **admin** - Full system access
2. **user** - Standard conference attendee
3. **supervisor** - Can approve team member registrations
4. **speaker** - Presenter access

## Security Features

### Password Security

- Minimum 10 characters
- Requires uppercase letter
- Requires lowercase letter
- Requires number
- Requires special character (@$!%*?&)
- Passwords hashed with bcrypt (12 rounds)

### Token Security

- Verification tokens: 64-character random strings
- Reset tokens: 64-character random strings
- Tokens are unique and non-reusable
- Tokens have expiration times:
  - Verification: 24 hours
  - Password reset: 1 hour

### CSRF Protection

API routes excluded from CSRF verification since they use JWT authentication.

## Database Schema

### Users Table Changes

Added fields:
- `verification_token` - For email verification
- `reset_token` - For password reset
- `reset_token_expires_at` - Token expiration timestamp

### Registrations Table

Stores conference registrations with:
- Registration type (attendee, speaker, team)
- Participant details
- Additional type-specific data (JSON)
- Status tracking

## Testing Emails

### Using Mailtrap

1. Go to Mailtrap Dashboard
2. Check "Demo Inbox" for test emails
3. View email content, headers, and body
4. No real emails sent (safe for testing)

### Using Laravel Tinker

```bash
php artisan tinker

# Send test notification
$user = App\Models\User::find(1);
$user->notify(new App\Notifications\VerifyEmailNotification('test-token'));
```

## Troubleshooting

### Email Not Sending

1. **Check .env credentials**
   ```bash
   php artisan config:clear
   ```

2. **Verify SMTP connection**
   ```bash
   php artisan tinker
   Mail::raw('Test email', function($mail) {
     $mail->to('test@example.com');
   });
   ```

3. **Check Laravel logs**
   ```bash
   tail -f storage/logs/laravel.log
   ```

### Verification Token Issues

1. **Token expired** - Request new registration
2. **Invalid token** - Check token in database
3. **Email mismatch** - Verify email parameter in URL

### CORS Issues

If frontend can't reach API, check `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://localhost:8000',
    // Add your production URLs
],
```

## Environment Variables Reference

```env
# Mail Configuration
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=noreply@nisconference.gov.ng
MAIL_FROM_NAME="NIS Conference System"

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laraveldb
DB_USERNAME=root
DB_PASSWORD=

# JWT
JWT_SECRET=your_jwt_secret
```

## Production Deployment Checklist

- [ ] Update MAIL_FROM_ADDRESS to official domain
- [ ] Use production SMTP credentials
- [ ] Set APP_ENV=production
- [ ] Enable SSL for all communications
- [ ] Set strong JWT_SECRET
- [ ] Configure FRONTEND_URL for production domain
- [ ] Enable rate limiting on auth endpoints
- [ ] Set up automated backups
- [ ] Configure email templates for branding
- [ ] Test all auth flows end-to-end

## Support

For issues or questions:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Check frontend console: Browser DevTools
3. Review SMTP credentials in Mailtrap/Gmail
4. Verify database migrations ran successfully
