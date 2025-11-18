# Campus Smart Eats - Localhost Hosting Guide

## ✅ Current Status

### Servers Running Locally
- **Backend API Server**: http://localhost:5000
- **Frontend Application**: http://localhost:8081
- **Database**: MongoDB (Cloud - Atlas)

---

## 🚀 Quick Start

### Option 1: Use Already Running Servers
If servers are already running:
1. Open browser and go to: **http://localhost:8081**
2. You should see the Campus Smart Eats application
3. Backend API is available at: **http://localhost:5000/api**

### Option 2: Start Fresh

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
Output should show:
```
Server is running on port 5000
Connected to MongoDB
```

#### Terminal 2 - Frontend Server (new terminal)
```bash
npm run dev
```
Output should show:
```
VITE ready in XXX ms
➜ Local: http://localhost:8081/
```

---

## 🌐 Accessing the Application

### Frontend URLs
| Page | URL | Authentication |
|------|-----|-----------------|
| Home | http://localhost:8081 | Not required |
| Menu | http://localhost:8081/menu | Not required |
| Login/Register | http://localhost:8081/auth | Not required |
| Cart | http://localhost:8081/cart | Required |
| Orders | http://localhost:8081/track-order | Required |
| Admin Dashboard | http://localhost:8081/admin/dashboard | Required (Admin) |

### Backend API URLs
| Endpoint | URL | Method |
|----------|-----|--------|
| Register | http://localhost:5000/api/auth/register | POST |
| Login | http://localhost:5000/api/auth/login | POST |
| Get Menu | http://localhost:5000/api/menu | GET |
| Get Orders | http://localhost:5000/api/orders/user | GET |
| Create Order | http://localhost:5000/api/orders | POST |

---

## 🔐 Test Credentials

### For Testing Authentication

**Admin Account**
```
Email: admin@campuseats.com
Password: Admin123!
```

**Customer Test Accounts**
```
Email: john@test.com
Password: Test123!

Email: jane@test.com
Password: Test123!
```

---

## 📋 Project Structure

```
campus-smart-eats/
├── server/                 # Backend (Express + Node.js)
│   ├── src/
│   │   ├── index.ts       # Server entry point (Port 5000)
│   │   ├── controllers/   # API route handlers
│   │   ├── routes/        # API routes
│   │   ├── models/        # MongoDB models
│   │   └── middleware/    # Auth middleware
│   └── package.json
│
├── src/                    # Frontend (React + Vite)
│   ├── pages/             # Page components
│   ├── components/        # UI components
│   ├── services/          # API calls
│   ├── hooks/             # Custom React hooks
│   └── App.tsx            # Main app (Port 8081)
│
├── package.json           # Frontend dependencies
└── .env                   # Environment variables
```

---

## 🔧 Configuration

### Frontend (.env)
```properties
VITE_API_URL=http://localhost:5000/api
```
This tells the frontend where to find the backend API.

### Backend (.env - server/.env)
```properties
PORT=5000
MONGODB_URI=mongodb+srv://[YOUR_CREDENTIALS]
JWT_SECRET=campus_eats_super_secret_jwt_key_2024
```

---

## ✅ Verification Checklist

Before assuming everything is working, verify:

- [ ] Backend running on port 5000
  - Test: Visit http://localhost:5000/api/menu in browser
  - Should return JSON array of menu items

- [ ] Frontend running on port 8081
  - Test: Visit http://localhost:8081 in browser
  - Should see the Campus Smart Eats home page

- [ ] Can login
  - Go to http://localhost:8081/auth
  - Use john@test.com / Test123!
  - Should see success message and redirect to home

- [ ] Menu loads
  - Go to http://localhost:8081/menu
  - Should see menu items (without images)

- [ ] Protected routes work
  - Try to access http://localhost:8081/cart without login
  - Should redirect to /auth

- [ ] Orders page works
  - Login first
  - Go to http://localhost:8081/track-order
  - Should show "No Orders Yet" if no orders placed

---

## 🧪 Testing Features

### 1. Test Authentication Flow
1. Go to http://localhost:8081/auth
2. Register new account OR login with existing credentials
3. See success notification
4. Should redirect to home page
5. Check navbar - should show "Orders" button and logout option

### 2. Test Menu
1. Go to http://localhost:8081/menu
2. See list of menu items
3. No authentication required

### 3. Test Shopping Cart
1. Must be logged in first
2. Go to http://localhost:8081/menu
3. Click "Add" on any item
4. Go to http://localhost:8081/cart
5. See items in cart

### 4. Test Orders
1. Must be logged in first
2. Place an order from cart
3. Go to http://localhost:8081/track-order
4. See your order with details

### 5. Test Admin Dashboard
1. Login as admin (admin@campuseats.com / Admin123!)
2. Go to http://localhost:8081/admin/dashboard
3. See admin-only features

---

## 🛠️ Troubleshooting

### Issue: "Cannot connect to localhost:5000"
**Solution**: 
- Verify backend server is running in terminal 1
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Kill conflicting process and restart backend

### Issue: "Frontend shows blank page"
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify .env file has correct VITE_API_URL

### Issue: "Cannot login - API error"
**Solution**:
- Verify backend server is running
- Check backend logs for error messages
- Verify MongoDB is connected
- Try correct credentials from list above

### Issue: "404 Page Not Found"
**Solution**:
- Make sure URL is exactly correct
- Check that you're on localhost:8081 (not 8080)
- Clear browser cache and reload

---

## 🚨 Common Port Issues

If you get "Port already in use" error:

### Kill process on port 5000
```powershell
# PowerShell
$process = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

### Kill process on port 8081
```powershell
# PowerShell
$process = Get-NetTCPConnection -LocalPort 8081 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

---

## 📱 Testing on Different Devices

### Same Machine (Already Working)
- Frontend: http://localhost:8081
- Backend: http://localhost:5000

### Different Machine on Same Network
Replace `localhost` with your machine's IP address:
```
Frontend: http://192.168.1.100:8081
Backend: http://192.168.1.100:5000
```

---

## 🔄 Restarting Servers

### If Frontend Not Updating
1. Stop frontend server (Ctrl+C in terminal)
2. Run `npm run dev` again

### If Backend Errors
1. Check terminal for error messages
2. Stop backend server (Ctrl+C in terminal)
3. Run `cd server; npm run dev` again

### Full Reset
```bash
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Start backend
cd server
npm run dev

# In new terminal, start frontend
npm run dev
```

---

## 📊 What's Included

✅ User Authentication (Login/Register)
✅ JWT Token-based Authorization
✅ Menu Display (no images)
✅ Shopping Cart
✅ Order Placement
✅ Order Tracking
✅ Admin Dashboard
✅ MongoDB Database (cloud)
✅ Responsive Design
✅ Error Handling

---

## 🎯 Next Steps

1. **Verify everything is working** using checklist above
2. **Test all features** mentioned in testing section
3. **Check browser console** (F12) for any errors
4. **Review logs** in backend terminal for issues
5. **Refer to QUICK_TEST_GUIDE.md** for detailed testing steps

---

## 📞 Support Resources

- `SETUP_AND_AUTH_GUIDE.md` - Authentication setup
- `TRACK_ORDER_DEBUG.md` - Order tracking issues
- `QUICK_TEST_GUIDE.md` - Step-by-step testing guide
- `README.md` - General project info

---

## 🎉 You're All Set!

Your Campus Smart Eats application is now running locally on:
- **Frontend**: http://localhost:8081
- **Backend**: http://localhost:5000

Happy testing! 🚀

Last Updated: November 18, 2025
