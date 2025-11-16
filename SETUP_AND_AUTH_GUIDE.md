# Campus Smart Eats - Setup & Authentication Guide

## ✅ Current Status

### Servers Running
- **Backend**: `http://localhost:5000` ✅
- **Frontend**: `http://localhost:8080` ✅
- **Database**: MongoDB Connected ✅

### No Errors Found
All TypeScript compilation errors have been resolved.

---

## 📝 Test Credentials

### Admin Account
- **Email**: `admin@campuseats.com`
- **Password**: `Admin123!`

### Customer Test Accounts
1. **Customer 1**
   - **Email**: `john@test.com`
   - **Password**: `Test123!`

2. **Customer 2**
   - **Email**: `jane@test.com`
   - **Password**: `Test123!`

---

## 🔐 Authentication Flow

### 1. **Registration**
- Navigate to `/auth`
- Click "Create an account" or toggle to register mode
- Fill in: Name, Email, Password
- Click "Register"
- System will automatically log you in and redirect to home

### 2. **Login**
- Navigate to `/auth`
- Enter email and password from credentials above
- Click "Login"
- Token will be saved to localStorage
- Redirected to home page

### 3. **Token Management**
- JWT tokens are stored in `localStorage` with key: `token`
- Tokens automatically sent in Authorization header for all API requests
- Tokens expire after 7 days

---

## 🛣️ Available Routes

### Public Routes
- `/` - Home page
- `/auth` - Login/Register page
- `/menu` - Menu page (no authentication required to view)

### Protected Routes (Requires Login)
- `/cart` - Shopping cart
- `/track-order` - Order tracking
- `/admin/dashboard` - Admin dashboard (admin only)

---

## 📊 API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
- Body: { name, email, password }
- Returns: { user, token }

POST /api/auth/login
- Body: { email, password }
- Returns: { user, token }
```

### Menu Endpoints
```
GET /api/menu
- Returns: Array of menu items
- No authentication required

GET /api/menu/:id
- Returns: Single menu item
- No authentication required
```

### Cart Endpoints
```
GET /api/cart
- Requires: Authentication

POST /api/cart/add
- Body: { menuItemId, quantity }
- Requires: Authentication

PUT /api/cart/update
- Body: { menuItemId, quantity }
- Requires: Authentication

DELETE /api/cart/clear
- Requires: Authentication
```

### Order Endpoints
```
GET /api/orders/user
- Returns: User's orders
- Requires: Authentication

POST /api/orders
- Body: { items, totalAmount }
- Requires: Authentication

GET /api/orders/:id
- Returns: Order details
- Requires: Authentication
```

---

## 🧪 Testing Authentication

### Method 1: Using Browser DevTools
1. Open application at `http://localhost:8080`
2. Open DevTools (F12)
3. Go to Console tab
4. Register/Login to get a token
5. Token is automatically stored in localStorage
6. Check Network tab to verify API calls include Authorization header

### Method 2: Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Test123!"}'

# Get User Orders (requires token)
curl -X GET http://localhost:5000/api/orders/user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🐛 Debugging Tips

### Check Backend Logs
Monitor the backend terminal (Port 5000) for:
- Connection messages
- Request logs
- Error messages

### Check Frontend Console
Open DevTools (F12) → Console for:
- API call errors
- Runtime errors
- Network request details

### Common Issues

#### Issue: "Failed to load menu items"
**Solution**: 
- Verify backend is running (`http://localhost:5000/api/menu`)
- Check CORS settings in backend
- Verify `.env` has correct API URL

#### Issue: "Invalid credentials"
**Solution**:
- Use correct email/password from credentials above
- Verify database has seeded users
- Check MongoDB connection

#### Issue: "Authentication token expired"
**Solution**:
- Login again to get new token
- Token expires after 7 days

---

## 🚀 How to Start

### 1. Start Backend Server
```bash
cd server
npm run dev
```

### 2. Start Frontend Server (new terminal)
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:8080`

---

## 📋 Features Implemented

✅ User Registration with password hashing
✅ User Login with JWT authentication
✅ Protected routes for authenticated users
✅ Menu display without authentication
✅ Shopping cart (requires authentication)
✅ Order placement (requires authentication)
✅ Order tracking (requires authentication)
✅ Admin dashboard (admin-only access)
✅ Automatic token refresh in headers
✅ Error handling and user feedback

---

## 🔍 Troubleshooting Checklist

- [ ] Both servers are running without errors
- [ ] MongoDB connection is established
- [ ] `.env` file contains JWT_SECRET and MONGODB_URI
- [ ] Can register new account
- [ ] Can login with existing credentials
- [ ] Token appears in localStorage after login
- [ ] Protected routes redirect to login if not authenticated
- [ ] Menu loads without authentication
- [ ] Cart/Orders work with authentication

---

## 📞 Support

If you encounter any issues:
1. Check the error messages in backend terminal
2. Check browser console (F12)
3. Verify all servers are running
4. Ensure MongoDB is connected
5. Check `.env` configuration

Last Updated: November 16, 2025
