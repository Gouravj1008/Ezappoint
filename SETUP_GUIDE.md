# ✅ Appointment Booking System - Complete Setup & Testing Guide

## 🎯 Quick Start (5 Minutes)

### 1. **Open the Auto Booking Demo**
- File: `frontend/auto-booking-demo.html`
- This page automates the entire booking flow in one click!

### 2. **Click "Start Complete Demo"**
- The system will:
  1. ✅ Register a new user
  2. ✅ Create hospital slots
  3. ✅ Search for available slots
  4. ✅ Book an appointment
  5. ✅ Generate and display **TOKEN NUMBER**

### 3. **Success!**
- You'll see:
  - ✅ Green confirmation box
  - 🎟️ **UNIQUE TOKEN NUMBER** (e.g., `2a3f5b`)
  - 📋 Complete appointment details

---

## 🏗️ Architecture Overview

```
Frontend (HTML/CSS/JS)
    ↓
[HTTP/CORS]
    ↓
Backend API Server (Node.js/Express) - Port 5000
    ↓
[Authentication Middleware]
    ↓
Routes & Controllers
    ├── /api/auth/* (registration, login)
    ├── /api/organization/* (slots)
    └── /api/appointments (booking)
    ↓
MongoDB Database
    ├── Users
    ├── Slots
    └── Appointments
```

---

## 📋 API Reference

### **Authentication APIs**

#### Register User
```
POST /api/auth/signup
Body: {
  username: "string",
  email: "string",
  phoneNumber: "10-digit",
  location: "string",
  password: "string"
}
Response: { success: true, user: {...}, token: "jwt_token" }
```

#### Login User
```
POST /api/auth/login
Body: {
  username: "string",
  password: "string"
}
Response: { success: true, token: "jwt_token", user: {...} }
```

---

### **Slot Management APIs**

#### Create Slots (Hospital Admin)
```
POST /api/organization/save-details
Authorization: Bearer {token}
Body: {
  organizationName: "Hospital Name",
  address: "Location",
  doctors: [{
    name: "Dr. Name",
    specialization: "Specialty",
    availableDate: "YYYY-MM-DD",
    timeFrom: "HH:MM AM/PM",
    timeTo: "HH:MM AM/PM",
    noOfTokens: 15
  }],
  isEmergencySlot: false
}
Response: {
  success: true,
  slots: [{
    _id: "mongo_id",
    hospitalName: "...",
    doctorName: "...",
    date: "...",
    totalSlots: 15,
    availableSlots: 15,
    isActive: true,
    createdAt: "..."
  }]
}
```

#### Search Available Slots
```
GET /api/organization/available-slots?date=YYYY-MM-DD&location=Mumbai&specialization=Cardiology
Authorization: Bearer {token}
Response: {
  success: true,
  count: 5,
  slots: [
    {
      _id: "slot_id",
      doctorName: "Dr. Name",
      hospitalName: "Hospital",
      specialization: "Cardiology",
      location: "Mumbai",
      date: "2025-12-28",
      timeSlot: "09:00 AM - 12:00 PM",
      totalSlots: 15,
      availableSlots: 5,
      isActive: true
    }
  ]
}
```

---

### **Appointment Booking API**

#### Book Appointment
```
POST /api/appointments
Authorization: Bearer {token}
Body: {
  slotId: "slot_id_from_search",
  patientName: "Full Name",
  contactNumber: "10-digit",
  isEmergency: false,
  emergencyReason: ""
}
Response: {
  message: "Appointment booked successfully",
  appointment: {
    _id: "appointment_id",
    tokenNumber: "123456",
    patientName: "...",
    contactNumber: "...",
    doctorName: "...",
    specialization: "...",
    organizationName: "...",
    date: "...",
    timeSlot: "...",
    location: "...",
    status: "pending",
    isEmergency: false,
    priorityLevel: 0,
    createdAt: "..."
  },
  remainingSlots: 4,
  isEmergency: false,
  priorityLevel: 0
}
```

---

## 📄 Files & Their Purposes

### **Frontend Files**
| File | Purpose | Type |
|------|---------|------|
| `auto-booking-demo.html` | **⭐ START HERE** - Auto booking flow | User Guide |
| `complete-booking-demo.html` | Manual step-by-step booking | User Guide |
| `Book Appointment.html` | Patient booking form | Feature |
| `test-create-slots.html` | Admin slot creation tool | Admin Tool |
| `User login.html` | User login page | Auth |
| `User sign up.html` | User registration | Auth |
| `view appointments.html` | View user appointments | Feature |
| `user deatils.html` | User profile management | Feature |

### **Backend Files**
| File | Purpose |
|------|---------|
| `server.js` | Main Express server |
| `routes/auth.js` | Authentication endpoints |
| `routes/appointments.js` | Booking endpoints |
| `routes/organization.js` | Slot management endpoints |
| `models/User.js` | User database schema |
| `models/Appointment.js` | Appointment schema |
| `models/Slot.js` | Slot schema |
| `middleware/auth.js` | JWT authentication |

---

## 🔑 Key Features

### ✅ **User Authentication**
- Register with email, phone, location
- Secure password hashing
- JWT token-based auth
- Session persistence

### ✅ **Slot Management**
- Create slots with doctor details
- Set date, time, capacity
- Mark as active/inactive
- Emergency slot support
- Auto-calculate availability

### ✅ **Slot Search** (with filters)
- Filter by date
- Filter by location (case-insensitive)
- Filter by specialization (optional)
- Real-time availability check
- Public API (no auth needed)

### ✅ **Appointment Booking**
- Validate patient details
- Auto-decrement slots
- Generate unique token numbers
- Emergency priority handling
- Status tracking (pending/confirmed)

### ✅ **Token Generation**
- Unique token for each booking
- Format: Last 6 digits of appointment ID
- Displayed in confirmation
- Used for appointment tracking
- Stored in database

---

## 🚀 Testing Scenarios

### **Scenario 1: Normal Booking** ✅
```
1. Go to auto-booking-demo.html
2. Click "Start Complete Demo"
3. Wait for completion
4. See token number in confirmation
Expected: Token generated, appointment confirmed
```

### **Scenario 2: Manual Booking** 📋
```
1. Open complete-booking-demo.html
2. Register → Create Slots → Search → Book
3. Fill details manually
4. Get token number
Expected: Same flow as auto demo
```

### **Scenario 3: Direct API Test** 🔌
```
curl -X POST http://localhost:5000/api/appointments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slotId": "slot_id",
    "patientName": "John Doe",
    "contactNumber": "9876543210",
    "isEmergency": false
  }'
Response: Token generated in response
```

---

## ⚙️ Configuration

### **Backend Server (server.js)**
```javascript
// Port: 5000
// MongoDB: Connected (auto-detected)
// CORS: Enabled for all origins
// JWT Secret: From .env
// API Base: http://localhost:5000
```

### **Frontend Config (config.js)**
```javascript
const API_URL = "http://localhost:5000";
```

---

## 🔍 Troubleshooting

### **Issue: "No slots found"**
- ✅ Create slots using `test-create-slots.html`
- ✅ Or click preset buttons in `complete-booking-demo.html`
- ✅ Ensure date is set to tomorrow or later

### **Issue: "Backend not responding"**
- ✅ Check if server is running: `node server.js`
- ✅ Verify MongoDB is connected
- ✅ Check port 5000 is not blocked

### **Issue: "Token invalid"**
- ✅ Clear localStorage and re-login
- ✅ Check token hasn't expired
- ✅ Verify Authorization header format

### **Issue: "Booking fails with validation error"**
- ✅ Contact number must be exactly 10 digits
- ✅ Patient name must not be empty
- ✅ Slot must be available (not fully booked)
- ✅ Slot must be marked as active

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│          User Registration/Login                 │
│  (POST /api/auth/signup, POST /api/auth/login)  │
│  └─→ JWT Token Generated & Stored               │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Admin Creates Hospital Slots              │
│  (POST /api/organization/save-details)          │
│  └─→ Slots stored in MongoDB                    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Patient Searches for Slots                │
│  (GET /api/organization/available-slots)        │
│  └─→ Returns matching active slots              │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Patient Books Appointment                 │
│  (POST /api/appointments)                       │
│  └─→ Decrements slot availability               │
│  └─→ Creates appointment record                 │
│  └─→ Generates token number                     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│     ✅ APPOINTMENT CONFIRMED                    │
│  🎟️ Token Number Generated & Displayed         │
│  📋 Confirmation with all details               │
└─────────────────────────────────────────────────┘
```

---

## 📱 Response Format

### **Success Response**
```json
{
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "507f1f77bcf86cd799439011",
    "tokenNumber": "439011",
    "patientName": "John Doe",
    "contactNumber": "9876543210",
    "doctorName": "Dr. Smith",
    "specialization": "Cardiology",
    "organizationName": "Apollo Hospital",
    "date": "2025-12-28",
    "timeSlot": "09:00 AM - 12:00 PM",
    "location": "Mumbai",
    "status": "pending",
    "isEmergency": false,
    "priorityLevel": 0,
    "createdAt": "2025-12-27T10:30:00Z"
  },
  "remainingSlots": 4,
  "isEmergency": false,
  "priorityLevel": 0
}
```

### **Error Response**
```json
{
  "message": "Slot ID, patient name, and contact number are required",
  "status": 400
}
```

---

## ✨ Success Checklist

- ✅ User can register
- ✅ User can login
- ✅ Admin can create slots
- ✅ Patient can search slots
- ✅ Patient can book appointment
- ✅ **Token number is generated**
- ✅ Token is unique per booking
- ✅ Confirmation shows all details
- ✅ Slots decrement correctly
- ✅ API responses are valid JSON

---

## 🎓 Learning Resources

### **To understand the flow:**
1. Start with `auto-booking-demo.html` - See it working
2. Read `complete-booking-demo.html` - Understand step-by-step
3. Check API responses in browser console (F12)
4. Review this guide for API details

### **To modify the system:**
1. Edit Frontend: Modify HTML/JS files in `/frontend`
2. Edit Backend: Modify Node.js files in `/backend`
3. Change API responses: Edit `backend/routes/*.js`
4. Add new fields: Update MongoDB schemas in `backend/models`

---

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| `file:///.../auto-booking-demo.html` | Auto booking demo |
| `file:///.../complete-booking-demo.html` | Manual booking steps |
| `http://localhost:5000` | Backend API server |
| `http://localhost:5000/api/appointments` | Book endpoint |
| `http://localhost:5000/api/organization/available-slots` | Search endpoint |

---

## 📞 Support

### **API Documentation**
- See API Reference section above
- Check response examples
- Review error messages

### **Debugging**
- Open browser console: Press F12
- Check network tab: See API requests
- Read server logs: Check terminal output
- Test API directly: Use curl or Postman

---

**Status:** ✅ **FULLY OPERATIONAL**
**Backend:** Running on http://localhost:5000
**Database:** MongoDB Connected
**Last Updated:** December 27, 2025

---

**Next Steps:**
1. ✅ Open `auto-booking-demo.html`
2. ✅ Click "Start Complete Demo"
3. ✅ Get your **TOKEN NUMBER**
4. ✅ Success! 🎉
