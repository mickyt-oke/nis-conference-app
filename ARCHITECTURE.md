# System Architecture & Flow Diagrams

## Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN SIGNUP FLOW                         │
└─────────────────────────────────────────────────────────────┘

1. USER SIGNUP
   ┌─────────────────┐
   │  /admin/signup  │
   │   (Frontend)    │
   └────────┬────────┘
            │
            ├─ Validate password strength
            ├─ Validate email format
            ├─ Check password confirmation
            │
            ▼
   ┌─────────────────────────────────┐
   │  POST /api/admin/register       │
   │  (Backend API)                  │
   └────────┬────────────────────────┘
            │
            ├─ Validate input
            ├─ Check email uniqueness
            ├─ Hash password (bcrypt)
            ├─ Generate verification token
            ├─ Create user (role: admin)
            │
            ▼
   ┌─────────────────────────────────┐
   │  Send Verification Email        │
   │  (VerifyEmailNotification)       │
   └────────┬────────────────────────┘
            │
            ├─ Email: /verify-email?token=...&email=...
            │
            ▼
   ┌─────────────────────────────────┐
   │  User receives email            │
   │  Clicks verification link       │
   └────────┬────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────┐
   │  /verify-email page (Frontend)  │
   │  Shows loading state            │
   └────────┬────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────┐
   │  POST /api/admin/verify-email   │
   │  (Auto on page load)            │
   └────────┬────────────────────────┘
            │
            ├─ Validate token
            ├─ Check token expiry (24h)
            ├─ Update user: email_verified_at
            ├─ Clear verification_token
            │
            ▼
   ┌─────────────────────────────────┐
   │  Success! User can now login    │
   │  Redirect to /login             │
   └─────────────────────────────────┘

═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                   PASSWORD RESET FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. REQUEST RESET
   ┌──────────────────────┐
   │  /forgot-password    │
   │  (Frontend)          │
   └─────────┬────────────┘
             │
             ├─ Enter email
             │
             ▼
   ┌──────────────────────────────────────┐
   │  POST /api/admin/request-password... │
   │  (Backend)                           │
   └─────────┬────────────────────────────┘
             │
             ├─ Verify user exists
             ├─ Check role = admin
             ├─ Generate reset token
             ├─ Set expiry (1 hour)
             │
             ▼
   ┌──────────────────────────────────────┐
   │  Send Password Reset Email           │
   │  (ResetPasswordNotification)          │
   └─────────┬────────────────────────────┘
             │
             ├─ Email: /reset-password?token=...&email=...
             │
             ▼
   ┌──────────────────────────────────────┐
   │  User receives email                 │
   │  Clicks reset link                   │
   └─────────┬────────────────────────────┘
             │
             ▼

2. RESET PASSWORD
   ┌──────────────────────┐
   │  /reset-password     │
   │  (Frontend)          │
   └─────────┬────────────┘
             │
             ├─ Display password form
             ├─ Validate on submit
             ├─ Check passwords match
             ├─ Validate strength
             │
             ▼
   ┌──────────────────────────────────────┐
   │  POST /api/admin/reset-password      │
   │  (Backend)                           │
   └─────────┬────────────────────────────┘
             │
             ├─ Validate token
             ├─ Check token not expired (1h)
             ├─ Match email with token
             ├─ Hash new password
             ├─ Update user password
             ├─ Clear reset_token
             │
             ▼
   ┌──────────────────────────────────────┐
   │  Success! Can login with new password│
   │  Auto redirect to /login             │
   └──────────────────────────────────────┘

═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                   LOGIN & RBAC FLOW                          │
└─────────────────────────────────────────────────────────────┘

1. LOGIN
   ┌─────────────────┐
   │   /login        │
   │  (Frontend)     │
   └────────┬────────┘
            │
            ├─ Enter email & password
            │
            ▼
   ┌─────────────────────────────────┐
   │  POST /api/login                │
   │  (Backend)                      │
   └────────┬────────────────────────┘
            │
            ├─ Verify credentials
            ├─ Generate JWT token
            ├─ Return user + role
            │
            ▼
   ┌─────────────────────────────────┐
   │  JWT token stored in cookies    │
   │  (httpOnly, secure, sameSite)   │
   └────────┬────────────────────────┘
            │
            ▼
   ┌─────────────────────────────────┐
   │  Redirect based on role         │
   │  admin → /admin/dashboard       │
   │  user → /dashboard              │
   └─────────────────────────────────┘

2. PROTECTED ROUTE ACCESS (RBAC)
   ┌────────────────────────────────────┐
   │  GET /api/admin/dashboard          │
   │  (with JWT token in header)        │
   └────────┬─────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────┐
   │  auth:api middleware               │
   │  - Parse JWT token                 │
   │  - Validate signature              │
   └────────┬─────────────────────────┘
            │
            ├─ Token invalid? → 401 Unauthorized
            │
            ▼
   ┌────────────────────────────────────┐
   │  role:admin middleware             │
   │  - Check user.role = 'admin'       │
   └────────┬─────────────────────────┘
            │
            ├─ Role mismatch? → 403 Forbidden
            │
            ▼
   ┌────────────────────────────────────┐
   │  ✓ Access Granted                  │
   │  Execute protected route handler   │
   └────────────────────────────────────┘
```

## Database Schema

```
┌─────────────────────────────────────┐
│            USERS TABLE              │
├─────────────────────────────────────┤
│ id                  INT PRIMARY KEY │
│ name                VARCHAR(255)    │
│ email               VARCHAR(255)    │
│ email_verified_at   TIMESTAMP (NEW) │
│ password            VARCHAR(255)    │
│ role                VARCHAR(50)     │
│                                     │
│ verification_token  VARCHAR(255) ✅ │
│ reset_token         VARCHAR(255) ✅ │
│ reset_token_...at   TIMESTAMP ✅    │
│                                     │
│ created_at          TIMESTAMP       │
│ updated_at          TIMESTAMP       │
└─────────────────────────────────────┘
        ▲
        │ references
        │
┌─────────────────────────────────────┐
│       REGISTRATIONS TABLE           │
├─────────────────────────────────────┤
│ id                  INT PRIMARY KEY │
│ registration_id     VARCHAR(50)     │
│ registration_type   ENUM (attendee, │
│                     speaker, team)  │
│ first_name          VARCHAR(255)    │
│ last_name           VARCHAR(255)    │
│ email               VARCHAR(255)    │
│ phone               VARCHAR(20)     │
│ organization        VARCHAR(255)    │
│ job_title           VARCHAR(255)    │
│ conference_id       VARCHAR(255)    │
│ status              ENUM (confirmed,│
│                     pending_appr..) │
│ additional_data     JSON            │
│ created_at          TIMESTAMP       │
│ updated_at          TIMESTAMP       │
└─────────────────────────────────────┘
```

## API Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  Pages: admin/signup, verify-email, forgot-password,        │
│          reset-password, login                              │
└──────────────┬──────────────────────────────────────────────┘
               │ HTTP/HTTPS
               │ JSON API
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY                                │
│  CORS enabled, CSRF disabled for API routes                 │
└──────────────┬──────────────────────────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
┌────────────────────────────────────────────────────────────┐
│              AUTHENTICATION ROUTES                          │
│  (No auth required)                                        │
│  - POST /api/admin/register                               │
│  - POST /api/admin/verify-email                           │
│  - POST /api/admin/request-password-reset                 │
│  - POST /api/admin/reset-password                         │
│  - POST /api/login                                        │
└────────────────────────────────────────────────────────────┘
    │
    ▼
┌────────────────────────────────────────────────────────────┐
│            BACKEND CONTROLLERS                              │
│  - AdminAuthController                                     │
│  - AuthController                                          │
│  - RegistrationController                                  │
└────────────────────────────────────────────────────────────┘
    │
    ├─────────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌──────────────────────┐    ┌──────────────────────┐
│   USER MODEL         │    │  NOTIFICATION        │
│  - Authenticate      │    │  - VerifyEmail       │
│  - Hash password     │    │  - ResetPassword     │
│  - Generate tokens   │    │  - Send via SMTP     │
└──────────────────────┘    └──────────────────────┘
    │                               │
    ▼                               ▼
┌──────────────────────┐    ┌──────────────────────┐
│   DATABASE           │    │   EMAIL SERVICE      │
│  - Users table       │    │  - Mailtrap          │
│  - Registrations     │    │  - Gmail             │
│  - Tokens stored     │    │  - SendGrid          │
└──────────────────────┘    └──────────────────────┘
```

## Security Layers

```
┌──────────────────────────────────────┐
│   LAYER 1: FRONTEND VALIDATION       │
│  - Password strength check           │
│  - Email format validation           │
│  - Confirmation field matching       │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│   LAYER 2: API INPUT VALIDATION      │
│  - Laravel Validator rules           │
│  - Type checking                     │
│  - Length constraints                │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│   LAYER 3: BUSINESS LOGIC            │
│  - Email uniqueness check            │
│  - Token validation                  │
│  - Expiration verification           │
│  - Role verification                 │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│   LAYER 4: DATA ENCRYPTION           │
│  - Bcrypt password hashing (12 rounds)
│  - JWT token signing                 │
│  - HTTPS/TLS for transit             │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│   LAYER 5: MIDDLEWARE PROTECTION     │
│  - auth:api (JWT validation)         │
│  - role:admin (RBAC checking)        │
│  - Rate limiting (throttle)          │
│  - CORS validation                   │
└──────────────────────────────────────┘
```

## Token Lifecycle

```
VERIFICATION TOKEN (24 hours):
┌──────────────────────────────────────────┐
│ 1. Generate (64-char random)             │
│    └─ User created                       │
│                                          │
│ 2. Email (in notification)               │
│    └─ User receives email                │
│                                          │
│ 3. Validate (on verify-email)            │
│    └─ Check token matches                │
│    └─ Check not expired (24h)            │
│    └─ Check email matches                │
│                                          │
│ 4. Clear (after verification)            │
│    └─ Set verification_token = NULL      │
│    └─ Set email_verified_at = now()      │
│                                          │
│ 5. Token is INVALID for reuse            │
└──────────────────────────────────────────┘

RESET TOKEN (1 hour):
┌──────────────────────────────────────────┐
│ 1. Generate (64-char random)             │
│    └─ User requests reset                │
│    └─ Set expiry (now + 1 hour)          │
│                                          │
│ 2. Email (in notification)               │
│    └─ User receives email                │
│                                          │
│ 3. Validate (on reset-password)          │
│    └─ Check token matches                │
│    └─ Check not expired (1h)             │
│    └─ Check email matches                │
│                                          │
│ 4. Update Password                       │
│    └─ Hash new password                  │
│    └─ Save to user                       │
│                                          │
│ 5. Clear (after reset)                   │
│    └─ Set reset_token = NULL             │
│    └─ Set reset_token_expires_at = NULL  │
│                                          │
│ 6. Token is INVALID for reuse            │
└──────────────────────────────────────────┘
```

---

**Architecture Date:** December 10, 2025
**Status:** ✅ Complete
