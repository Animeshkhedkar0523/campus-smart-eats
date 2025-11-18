# Quick Testing Guide - Track Order Fix

## Current Status ✅
- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Server**: Running on `http://localhost:8081`
- **Database**: MongoDB Connected

---

## Step-by-Step Testing

### 1. Open the Application
Navigate to: **http://localhost:8081**

### 2. Login First (IMPORTANT!)
- Click the **"Login"** button in the top right
- Use these credentials:
  ```
  Email: john@test.com
  Password: Test123!
  ```
- Click **"Login"**
- You should see success notification and be redirected to home

### 3. Look for "Orders" Button
After logging in, check the navbar:
- You should see a new **"Orders"** button (only visible when logged in)
- It appears next to the Cart button

### 4. Click "Orders" Button
- Click the **"Orders"** button in the navbar
- You should see one of these:
  
  **A) Loading Spinner** (briefly)
  - Page header "Your Orders" with a spinning loader
  
  **B) "No Orders Yet" Message**
  - If you haven't placed any orders
  - Shows message and "Browse Menu" button
  
  **C) List of Orders**
  - If you've placed orders, shows order details

---

## What's Fixed

✅ **Route Fixed**: Changed from `/track` to `/track-order`
✅ **Navbar Updated**: Added "Orders" button (visible only when logged in)
✅ **Loading State**: Now shows page with spinner, not blank screen
✅ **Error Handling**: Better logging and error messages
✅ **Authentication**: Properly checks if user is logged in before showing page

---

## If Still Getting 404

### Option 1: Check Browser Console
1. Open DevTools: Press **F12**
2. Go to **Console** tab
3. Look for error messages (red text)
4. Take a screenshot and share the error

### Option 2: Check if Logged In
1. Open DevTools: Press **F12**
2. Go to **Application** tab
3. Click **LocalStorage** on the left
4. Look for these keys:
   - `token` (should have a long string)
   - `user` (should have user data)
5. If missing, you're not logged in - need to login again

### Option 3: Direct URL Test
Try accessing directly: http://localhost:8081/track-order
- If redirects to login (`/auth`), you're not authenticated
- If shows "Oops Page Not Found", there may be a routing issue

---

## Testing Different Scenarios

### Scenario 1: Unauthenticated User
1. Clear browser cache or open in Incognito mode
2. Try to go to http://localhost:8081/track-order
3. Should redirect to login page (`/auth`)

### Scenario 2: Authenticated User (No Orders)
1. Login with `john@test.com` / `Test123!`
2. Click "Orders" in navbar
3. Should show "No Orders Yet" message

### Scenario 3: Place an Order (Then Track)
1. Login first
2. Go to Menu and add items to cart
3. Proceed to checkout and place order
4. Then click "Orders" to see your order

---

## Browser Console Commands for Testing

Open DevTools (F12) → Console and run these:

```javascript
// Check login status
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
console.log('Logged In:', !!token);
console.log('User:', user ? JSON.parse(user) : 'Not logged in');

// Test API endpoint directly
fetch('http://localhost:5000/api/orders/user', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then(r => r.json()).then(d => {
  console.log('API Response:', d);
  console.log('Number of orders:', Array.isArray(d) ? d.length : 'Error');
});

// Check current route
console.log('Current URL:', window.location.href);
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 Page Not Found | Not logged in OR route changed | Login first, verify URL is `/track-order` |
| Blank page | Component error or redirect loop | Check console for errors |
| "No Orders Yet" | No orders in database | This is normal - place an order first |
| Button not showing | Not logged in | Must login first to see Orders button |
| API Error | Backend issue or wrong token | Check backend logs, verify token exists |

---

## Verification Checklist

Before reporting issues, verify:
- [ ] Both servers are running (Backend: 5000, Frontend: 8081)
- [ ] You successfully logged in with `john@test.com`
- [ ] Token exists in LocalStorage (check DevTools)
- [ ] You can see "Orders" button in navbar
- [ ] You tried clicking "Orders" button
- [ ] You checked browser console for errors (F12)
- [ ] You tried direct URL: `http://localhost:8081/track-order`

---

## Expected User Flow

```
1. Visit http://localhost:8081
   ↓
2. See Login button in navbar
   ↓
3. Click Login → Go to /auth
   ↓
4. Enter john@test.com / Test123!
   ↓
5. See success notification
   ↓
6. See "Orders" button in navbar
   ↓
7. Click "Orders" button
   ↓
8. See "Your Orders" page with:
   - Loading spinner briefly
   - "No Orders Yet" if no orders
   - List of orders if orders exist
```

---

## Need Help?

1. **Check this guide first**
2. **Check browser console** (F12 → Console)
3. **Check backend logs** (terminal running `npm run dev`)
4. **Verify authentication** (LocalStorage check)
5. **Share exact error message** if getting errors

Last Updated: November 16, 2025
