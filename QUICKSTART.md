# NextIn - Quick Start Guide

## ✅ Connection Status

Your frontend is now connected to the backend! Here's what was set up:

## 📁 Files Created/Modified

### New Files:
1. **frontend/config.js** - Centralized API configuration
2. **frontend/test-connection.html** - Backend connection test page
3. **backend/start-server.bat** - Windows batch file to start server
4. **README.md** - Complete project documentation

### Modified Files:
1. **backend/package.json** - Added start script and type: module
2. **frontend/index.html** - Added test backend link
3. **frontend/User sign up.html** - Added config.js reference
4. **frontend/User login.html** - Added config.js reference
5. **frontend/Book Appointment.html** - Fixed API endpoint and added config.js
6. **frontend/view appointments.html** - Added config.js reference

## 🚀 Current Status

✅ Backend server is RUNNING on http://localhost:5000
✅ MongoDB is CONNECTED
✅ All dependencies are installed
✅ API endpoints are configured correctly

## 🔗 API Endpoints

### Authentication (Public)
- `POST http://localhost:5000/api/auth/signup`
- `POST http://localhost:5000/api/auth/login`

### Appointments (Protected - Requires JWT)
- `POST http://localhost:5000/api/appointments` - Create appointment
- `GET http://localhost:5000/api/appointments/my` - User's appointments
- `GET http://localhost:5000/api/appointments/all` - All appointments (admin)

## 📝 How to Use

### 1. Open Frontend
Open the frontend in a browser:
- Direct: Open `frontend/index.html` in your browser
- OR use Live Server (VS Code extension)
- OR run: `cd frontend && npx http-server -p 8000`

### 2. Test Connection
Click the "🔌 Test Backend" link in the navigation bar to verify:
- ✅ Backend server connectivity
- ✅ Signup API functionality
- ✅ Login API functionality
- ✅ JWT token generation

### 3. Create User Account
1. Click "User Signup" from homepage
2. Fill in registration form:
   - Username (unique)
   - Phone Number (10 digits)
   - Email
   - Location/City
   - Password
3. Submit → User created in MongoDB
4. Redirected to login page

### 4. Login
1. Enter your username and password
2. Click Login
3. JWT token saved in localStorage
4. Redirected to Book Appointment page

### 5. Book Appointment
1. Fill in appointment details:
   - Patient Name
   - Contact Number
   - Date (must be future date)
   - Location
   - Hospital Name
   - Specialization
   - Doctor Name
   - Time Slot
2. Submit booking
3. Receive confirmation with token number

### 6. View Appointments
- Users: See their own appointments at `/my` endpoint
- Hospital/Admin: See all appointments at `/all` endpoint

## 🔧 Technical Details

### Authentication Flow
1. User signs up → Password hashed with bcrypt → Stored in MongoDB
2. User logs in → Password verified → JWT token generated (7-day expiry)
3. Token stored in localStorage as 'jwtToken'
4. Protected routes require Authorization header: `Bearer <token>`

### Data Models

**User Schema:**
```javascript
{
  username: String (unique),
  phoneNumber: String,
  email: String (unique),
  location: String,
  passwordHash: String,
  createdAt: Date
}
```

**Appointment Schema:**
```javascript
{
  user: ObjectId (ref: User),
  patientName: String,
  contactNumber: String,
  date: String,
  location: String,
  organizationName: String,
  specialization: String,
  doctorName: String,
  timeSlot: String,
  tokenNumber: Number (auto-generated),
  createdAt: Date
}
```

## 🛠️ Troubleshooting

### Backend Not Starting
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Restart backend
cd backend
node server.js
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
Get-Process mongod

# Start MongoDB (if not running)
net start MongoDB
# OR
mongod
```

### CORS Errors
- Backend already has CORS enabled
- Make sure backend is running on port 5000
- Check browser console for specific error

### Login Not Working
1. Clear localStorage: `localStorage.clear()` in browser console
2. Check Network tab in DevTools for API responses
3. Verify credentials are correct

### Cannot Create Appointment
1. Make sure you're logged in (check localStorage for 'jwtToken')
2. Token might be expired (7-day expiry)
3. Re-login to get fresh token

## 🎯 Next Steps

1. **Test the connection**: Visit http://localhost:8000/test-connection.html
2. **Create a test user**: Use the signup form
3. **Login**: Get your JWT token
4. **Book an appointment**: Test the full flow
5. **View appointments**: Check if data is persisted

## 📊 Monitoring

### Check Backend Logs
Look at the terminal where `node server.js` is running for:
- MongoDB connection status
- Incoming requests
- Errors and stack traces

### Check Browser Console
Press F12 in browser to see:
- API requests/responses
- JavaScript errors
- localStorage contents

## 🔐 Security Notes

- Change `JWT_SECRET` in `.env` for production
- Use HTTPS in production
- Never commit `.env` file
- Implement rate limiting for production
- Add input validation and sanitization

## 📚 Resources

- MongoDB docs: https://docs.mongodb.com/
- Express.js: https://expressjs.com/
- JWT: https://jwt.io/
- Mongoose: https://mongoosejs.com/

## 💡 Tips

- Keep backend terminal open to see logs
- Use browser DevTools Network tab to debug API calls
- Check localStorage for stored JWT token
- Backend auto-restarts on code changes if using nodemon

---

**Backend Status:** ✅ Running on http://localhost:5000
**Frontend:** Open index.html in browser
**Test Page:** http://localhost:8000/test-connection.html (if using http-server)

Enjoy using NextIn! 🎉
