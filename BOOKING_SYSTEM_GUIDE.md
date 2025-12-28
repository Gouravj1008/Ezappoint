# 🏥 Complete Appointment Booking System - Setup & Testing Guide

## ✅ Complete System Overview

### 📋 API Summary

#### **Slot Creation API** (Hospital Admin)
```
POST /api/organization/save-details
Authorization: Bearer {token}
Body: {
  organizationName: "Hospital Name",
  address: "Location",
  doctors: [{
    name: "Dr. Name",
    specialization: "Cardiology",
    availableDate: "2025-12-28",
    timeFrom: "09:00 AM",
    timeTo: "12:00 PM",
    noOfTokens: 15
  }],
  isEmergencySlot: false
}
Response: { success: true, slots: [...] }
```

#### **Slot Search API** (Patient - to find available slots)
```
GET /api/organization/available-slots?date=2025-12-28&location=Mumbai&specialization=Cardiology
Authorization: Bearer {token}
Response: { success: true, slots: [{
  _id: "...",
  hospitalName: "...",
  doctorName: "...",
  specialization: "...",
  location: "...",
  date: "...",
  timeSlot: "...",
  availableSlots: 5,
  totalSlots: 10,
  isActive: true
}] }
```

#### **Book Appointment API** (Patient - to book a slot)
```
POST /api/appointments
Authorization: Bearer {token}
Body: {
  slotId: "slot_id_from_search",
  patientName: "John Doe",
  contactNumber: "9876543210",
  isEmergency: false,
  emergencyReason: ""
}
Response: {
  message: "Appointment booked successfully",
  appointment: {
    _id: "...",
    tokenNumber: "123456",
    patientName: "...",
    doctorName: "...",
    date: "...",
    timeSlot: "...",
    status: "pending"
  },
  remainingSlots: 4,
  isEmergency: false,
  priorityLevel: 0
}
```

---

## 🚀 How to Test the Complete Flow

### **Step 1️⃣: Register a User**
Open: `complete-booking-demo.html`
- Click "Auto-Fill Test User" (auto-fills form with random user)
- Click "Register User" (creates account and logs in)
- ✅ You'll get a JWT token (shown in status box)

### **Step 2️⃣: Create Hospital Slots**
- Click one of the preset buttons:
  - ❤️ Cardiology Slots
  - 🧠 Neurology Slots
  - 🦷 Dentistry Slots
  - 🚨 Emergency Slots
- ✅ Slots are created and stored in database

### **Step 3️⃣: Search for Available Slots**
- Select a date (tomorrow or later)
- Enter location (e.g., Mumbai, New Delhi, Bangalore)
- Optionally filter by specialization (e.g., Cardiology)
- Click "Search Slots"
- ✅ Available slots appear as cards

### **Step 4️⃣: Select a Slot**
- Click on any slot card to select it
- Slot details appear below
- ✅ Slot is selected (shows highlighted with gold border)

### **Step 5️⃣: Book the Appointment**
- Fill in Patient Name
- Fill in Contact Number (10 digits)
- Optionally check "Emergency Booking" and add reason
- Click "Book Appointment"
- ✅ **SUCCESS!** Token number is generated and displayed
- ✅ Appointment confirmation shows all details

---

## 📱 Page Files

### **Slot Creation & Management**
- `test-create-slots.html` - Admin tool to create sample slots
- API: POST `/api/organization/save-details`

### **Patient Booking**
- `Book Appointment.html` - Original patient booking interface
- APIs: 
  - GET `/api/organization/available-slots` (search)
  - POST `/api/appointments` (book)

### **Complete Demo (RECOMMENDED)**
- `complete-booking-demo.html` - All-in-one system with 5 steps
- User registration → Slot creation → Search → Book → Confirmation

---

## 🔧 API Flow Diagram

```
User Registration/Login
        ↓
   Get JWT Token
        ↓
  Create Slots (Hospital Admin)
        ↓
 Search Available Slots
        ↓
  Select a Slot
        ↓
 Fill Booking Details
   (Name, Contact, etc)
        ↓
   POST /api/appointments
        ↓
  ✅ TOKEN GENERATED
        ↓
Show Appointment Confirmation
```

---

## 🎯 Key Features Implemented

### ✅ Authentication
- User registration with username, email, phone, location, password
- JWT token-based login
- Token stored in localStorage
- All protected endpoints require Bearer token

### ✅ Slot Management
- Hospital admins can create slots with doctor details
- Slots include: date, time range, total slots, location, specialization
- Automatic availability tracking (available = total - booked)
- Status becomes inactive when fully booked
- Emergency slot flagging supported

### ✅ Slot Search (with filters)
- Search by date
- Search by location (case-insensitive)
- Filter by specialization (optional)
- Returns only active slots with available spots
- No auth required for search (public API)

### ✅ Appointment Booking
- Requires valid slot ID from search
- Patient name and contact number validation
- Contact must be 10 digits
- Emergency booking option with priority levels
- Auto-decrement available slots on booking
- Automatic status management

### ✅ Token Generation
- Unique token number generated for each booking
- Token number visible in confirmation
- Stored in appointment record
- Can be used for reference/follow-up

### ✅ Emergency Mode
- Priority level = 100 for emergency, 0 for normal
- Emergency bookings confirmed immediately
- Regular bookings have pending status
- Can book even if near capacity (for emergencies)

---

## 🐛 Common Issues & Fixes

### Issue: "Slot ID is missing"
**Cause:** Slot object doesn't have `_id` field
**Solution:** Ensure slots were created with `POST /api/organization/save-details`

### Issue: "No slots found"
**Cause:** No matching slots in database
**Solution:** 
1. Create slots using preset buttons
2. Ensure date, location match your search criteria
3. Check slot isActive status is true

### Issue: "Appointment booked but no token"
**Cause:** Response missing tokenNumber
**Solution:** Token defaults to appointment._id.slice(-6)

### Issue: "Contact validation fails"
**Cause:** Contact number isn't exactly 10 digits
**Solution:** Enter exactly 10 digits (0-9)

---

## 📊 Data Models

### User Model
```
{
  username: String,
  email: String,
  phoneNumber: String,
  location: String,
  password: String (hashed),
  createdAt: Date
}
```

### Slot Model
```
{
  hospitalName: String,
  doctorName: String,
  specialization: String,
  location: String,
  date: String (YYYY-MM-DD),
  timeSlot: String (e.g., "09:00 AM - 12:00 PM"),
  totalSlots: Number,
  bookedSlots: Number,
  availableSlots: Number (auto-calculated),
  isActive: Boolean,
  isEmergencySlot: Boolean,
  createdBy: ObjectId (User),
  timestamps: true
}
```

### Appointment Model
```
{
  user: ObjectId (User),
  slotId: ObjectId (Slot),
  patientName: String,
  contactNumber: String,
  date: String,
  location: String,
  organizationName: String,
  specialization: String,
  doctorName: String,
  timeSlot: String,
  isEmergency: Boolean,
  emergencyReason: String,
  priorityLevel: Number (0 or 100),
  status: String (pending/confirmed),
  tokenNumber: String,
  timestamps: true
}
```

---

## 🎪 Test Scenarios

### Scenario 1: Normal Booking
1. Register user "patient1"
2. Create Cardiology slots
3. Search date=tomorrow, location=Mumbai
4. Book with name="John Doe", contact="9876543210"
5. ✅ Should get token

### Scenario 2: Emergency Booking
1. Register user "emergency_user"
2. Create Emergency slots
3. Search for emergency slots
4. Check Emergency checkbox
5. Fill emergency reason (e.g., "Severe chest pain")
6. ✅ Should show "HIGH PRIORITY" badge

### Scenario 3: Multiple Bookings
1. Create Neurology slots (20 total)
2. Book 20 appointments (should fail on 21st - fully booked)
3. Check that remaining slots decreases

### Scenario 4: Location Filter
1. Create slots for Mumbai, Delhi, Bangalore
2. Search only Mumbai
3. ✅ Should show only Mumbai slots

---

## 🌐 Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/signup | ❌ | Register user |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/profile | ✅ | Get user profile |
| POST | /api/organization/save-details | ✅ | Create slots |
| GET | /api/organization/available-slots | ❌ | Search slots |
| GET | /api/organization/all-slots | ✅ | Get all slots (admin) |
| GET | /api/organization/emergency-slots | ❌ | Get emergency slots |
| POST | /api/appointments | ✅ | Book appointment |
| GET | /api/appointments/my | ✅ | Get my appointments |
| GET | /api/appointments/all | ✅ | Get all appointments (admin) |

---

## 🚀 Quick Start Commands

```bash
# 1. Start Backend Server
cd backend
node server.js

# 2. Open Frontend
cd frontend
# Open complete-booking-demo.html in browser

# 3. Follow the 5-step flow
```

---

## ✨ Success Indicators

- ✅ User registration works
- ✅ JWT token is generated
- ✅ Slots are created in database
- ✅ Slot search returns results
- ✅ Appointment can be booked
- ✅ **Token number is generated and displayed**
- ✅ Appointment confirmation shows all details
- ✅ Emergency mode works with priority

---

**Status:** ✅ All APIs integrated and working
**Last Updated:** December 27, 2025
**Server:** Running on http://localhost:5000
