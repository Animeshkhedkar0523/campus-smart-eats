# Track Order Debugging Guide

## Current Status
- **Backend**: Running on http://localhost:5000 ✅
- **Frontend**: Running on http://localhost:8081 ✅
- **Issue**: 404 Page Not Found when clicking Track Order

## Steps to Test Track Order

### Step 1: Login First
1. Go to http://localhost:8081/auth
2. Use credentials:
   - Email: `john@test.com`
   - Password: `Test123!`
3. Click "Login"
4. You should see a success message and be redirected to home

### Step 2: Navigate to Track Order
1. After login, look at the navbar - you should see an "Orders" button
2. Click "Orders" button
3. You should see one of these:
   - Loading spinner (data is loading)
   - "No Orders Yet" message (no orders placed)
   - List of orders if you've placed orders

## Common Issues & Solutions

### Issue 1: "Not logged in" 
**Solution**: Make sure you're logged in first. Check:
- Go to browser DevTools (F12) → Application → LocalStorage
- Look for `token` key - it should have a value
- Look for `user` key - it should have user data

### Issue 2: Route still shows 404
**Solution**: 
- The route is `/track-order` (not `/track`)
- Try navigating directly: http://localhost:8081/track-order
- If still 404, the page is redirecting due to ProtectedRoute

### Issue 3: ProtectedRoute redirecting to 404
**Solution**:
- This happens when authentication state isn't properly set
- Check localStorage for token and user
- If missing, you need to login again

## Testing via Browser Console

Open DevTools (F12) → Console and run:

```javascript
// Check if you're logged in
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
console.log('Token:', token);
console.log('User:', user);

// Check current page
console.log('Current URL:', window.location.href);

// Manually test API call
fetch('http://localhost:5000/api/orders/user', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json()).then(d => console.log('Orders:', d));
```

## Expected Flow

1. **Unauthenticated**: Click Orders → Redirects to /auth
2. **Authenticated, No Orders**: Orders page → Shows "No Orders Yet" message
3. **Authenticated, With Orders**: Orders page → Shows list of orders

## Frontend Routes

- `/` - Home (public)
- `/menu` - Menu (public)
- `/cart` - Shopping Cart (protected)
- `/track-order` - Order Tracking (protected)
- `/auth` - Login/Register (public)
- `/admin/login` - Admin Login (public)
- `/admin/dashboard` - Admin Dashboard (protected, admin only)

## Testing Credentials

### Admin Account
- Email: `admin@campuseats.com`
- Password: `Admin123!`

### Customer Test Accounts
- Email: `john@test.com` / Password: `Test123!`
- Email: `jane@test.com` / Password: `Test123!`

## Troubleshooting Checklist

- [ ] Are both servers running? (Backend on 5000, Frontend on 8081)
- [ ] Did you login successfully?
- [ ] Is the token present in localStorage?
- [ ] Is the user data present in localStorage?
- [ ] Did you use the correct URL: http://localhost:8081/track-order?
- [ ] Check browser console (F12) for any JavaScript errors
- [ ] Check backend logs for API errors

## Still Having Issues?

1. **Check Browser Console** (F12):
   - Look for any red error messages
   - Check Network tab for failed API calls
   - Check what the API is returning

2. **Check Backend Logs**:
   - Look at the backend terminal for error messages
   - Verify MongoDB connection is working

3. **Test API Directly**:
   - Use curl or Postman to test the API endpoint
   - Make sure the token is being sent correctly
