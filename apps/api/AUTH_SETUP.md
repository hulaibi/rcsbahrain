# Authentication Setup Guide

## 📋 What Was Created

### 1. **Database Schema** (`apps/api/prisma/schema.prisma`)
- `Role` model - Manages user roles (admin, user)
- `User` model - User accounts with role relationships

### 2. **Authentication Files**
- `src/lib/jwt.ts` - JWT token generation and verification
- `src/middlewares/auth.middleware.ts` - Auth middleware and role-based access control
- `src/controllers/auth.controller.ts` - Login, register, and profile endpoints
- `src/routes/auth.routes.ts` - Auth routes (login, register, profile)
- `src/routes/admin.routes.ts` - Protected admin routes for user management

### 3. **Database Seeding**
- `prisma/seed.ts` - Creates default roles and super admin user

### 4. **Configuration**
- Updated `package.json` with new dependencies and scripts
- `.env.example` - Environment variables template

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
cd apps\api
npm install
```

This installs:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `@types/bcryptjs` and `@types/jsonwebtoken` - TypeScript types

---

### Step 2: Setup Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
copy .env.example .env
```

Then edit `.env` with your database URL:

```
DATABASE_URL="postgresql://user:password@localhost:5432/rcsbahrain"
DIRECT_URL="postgresql://user:password@localhost:5432/rcsbahrain"
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRY="24h"
CLIENT_URL="http://localhost:3000"
```

---

### Step 3: Run Migrations

```bash
npx prisma migrate dev --name add_user_roles
```

Or use the npm script:

```bash
npm run prisma:migrate -- --name add_user_roles
```

---

### Step 4: Seed Database with Super Admin

```bash
npm run db:seed
```

This creates:
- **Admin Role** (name: "admin")
- **User Role** (name: "user")  
- **Super Admin User**
  - Email: `admin@rcsbahrain.com`
  - Password: `Admin@123456` ⚠️ **Change after first login!**

---

### Step 5: Generate Prisma Client

```bash
npm run prisma:generate
```

---

### Step 6: Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000` (or your configured PORT)

---

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

#### **Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@rcsbahrain.com",
  "password": "Admin@123456"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "clxx...",
    "email": "admin@rcsbahrain.com",
    "fullName": "Super Admin",
    "role": "admin"
  }
}
```

#### **Register**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}

Response:
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "clxx...",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user"
  }
}
```

#### **Get Profile** (Protected)
```bash
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>

Response:
{
  "user": {
    "id": "clxx...",
    "email": "admin@rcsbahrain.com",
    "fullName": "Super Admin",
    "isActive": true,
    "createdAt": "2026-07-12T...",
    "role": {
      "name": "admin",
      "description": "Administrator with full access"
    }
  }
}
```

---

### Admin Routes (`/api/admin`) - All Require Admin Role

#### **Get Current User Info** (Protected)
```bash
GET /api/admin/me
Authorization: Bearer <your-jwt-token>

Response:
{
  "message": "User data",
  "user": {
    "userId": "clxx...",
    "email": "admin@rcsbahrain.com",
    "role": "admin"
  }
}
```

#### **List All Users** (Admin Only)
```bash
GET /api/admin/users
Authorization: Bearer <admin-jwt-token>

Response:
{
  "users": [
    {
      "id": "clxx...",
      "email": "admin@rcsbahrain.com",
      "fullName": "Super Admin",
      "isActive": true,
      "createdAt": "2026-07-12T...",
      "role": {
        "name": "admin"
      }
    }
  ]
}
```

#### **Deactivate User** (Admin Only)
```bash
PATCH /api/admin/users/:userId/deactivate
Authorization: Bearer <admin-jwt-token>

Response:
{
  "message": "User deactivated successfully",
  "user": {
    "id": "clxx...",
    "email": "user@example.com",
    "fullName": "John Doe",
    "isActive": false
  }
}
```

#### **Assign Role to User** (Admin Only)
```bash
PATCH /api/admin/users/:userId/role
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "roleName": "admin"
}

Response:
{
  "message": "User role updated successfully",
  "user": {
    "id": "clxx...",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

---

## 🔑 How to Use the JWT Token

1. **Login** to get a token
2. **Include token** in Authorization header for protected routes:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

Example with cURL:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  http://localhost:5000/api/auth/profile
```

Example with Fetch:
```javascript
const response = await fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| **Migration fails** | Ensure PostgreSQL is running and DATABASE_URL is correct |
| **"No token provided"** | Add `Authorization: Bearer <token>` header |
| **"Invalid token"** | JWT_SECRET doesn't match or token is expired |
| **"Insufficient permissions"** | Only admin can access admin routes. Change JWT_SECRET if token is from different environment |
| **Seed fails** | Run migration first: `npm run prisma:migrate` |
| **Prisma client not found** | Run: `npm run prisma:generate` |

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `DIRECT_URL` | Direct database connection | `postgresql://...` |
| `JWT_SECRET` | Secret key for signing tokens | `your-secret-key` |
| `JWT_EXPIRY` | Token expiration time | `24h`, `7d`, `30d` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `NODE_ENV` | Environment | `development`, `production` |

---

## 🔄 Common Workflows

### Change Super Admin Password
```bash
# Use the login endpoint to get token, then update through frontend
# Or directly via database with bcrypt
```

### Create New Admin User
```bash
POST /api/auth/register  # Register as regular user
# Then use admin account to:
PATCH /api/admin/users/:userId/role  # Assign admin role
```

### Expire Tokens Early
Reduce `JWT_EXPIRY` in `.env`:
```
JWT_EXPIRY="1h"  # Tokens expire after 1 hour
```

---

## ✅ Next Steps

1. ✅ Update `.env` with your database credentials
2. ✅ Run migrations: `npm run prisma:migrate`
3. ✅ Seed database: `npm run db:seed`
4. ✅ Start server: `npm run dev`
5. ✅ Login with admin credentials
6. ✅ Test protected routes with JWT token

---

## 📚 Files Modified/Created

```
apps/api/
├── prisma/
│   ├── schema.prisma          (✏️ Modified - Added Role & User models)
│   └── seed.ts                (✨ Created - Database seeding)
├── src/
│   ├── lib/
│   │   └── jwt.ts             (✨ Created - JWT utilities)
│   ├── middlewares/
│   │   └── auth.middleware.ts (✨ Created - Auth & role middleware)
│   ├── controllers/
│   │   └── auth.controller.ts (✨ Created - Auth endpoints)
│   ├── routes/
│   │   ├── auth.routes.ts     (✨ Created - Auth routes)
│   │   └── admin.routes.ts    (✨ Created - Admin routes)
│   └── app.ts                 (✏️ Modified - Added auth routes)
├── package.json               (✏️ Modified - Added dependencies & scripts)
└── .env.example               (✨ Created - Environment template)
```

---

Questions? Let me know! 🚀
