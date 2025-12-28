# 🏥 Real-Time Slot Booking System Documentation

## Overview
This system allows doctors/hospitals to create time slots, and patients to book appointments from available slots in real-time. All slot updates happen instantly across the system.

---

## 🎯 Key Features

### 1. **Slot Creation (Hospital/Doctor)**
- Doctors can create slots with a **default of 10 appointments per slot**
- Each slot contains:
  - Hospital Name
  - Doctor Name
  - Specialization
  - Location (city/town)
  - Date
  - Time Slot (e.g., "10:00 AM - 11:00 AM")
  - Total Slots (default: 10)
  - Available Slots (auto-calculated)
  - Booked Slots (auto-incremented)
  - Status (Active/Full)

### 2. **Real-Time Slot Search (Patient)**
- Patients can search available slots by:
  - Date (required)
  - Location (required)
  - Specialization (optional)
- Results show only **active slots** with available appointments
- Displays available count for each slot

### 3. **Dropdown Slot Selection**
- Search results populate a dropdown list
- Each dropdown option shows:
  - Doctor name
  - Time slot
  - Number of available slots
- Selecting a slot displays full details

### 4. **Real-Time Booking**
- When a patient books an appointment:
  - `bookedSlots` increments by 1
  - `availableSlots` decrements by 1
  - If `availableSlots` reaches 0, slot becomes inactive
  - Returns remaining slot count instantly
- Auto-refresh every 10 seconds to show real-time availability

### 5. **Automatic Slot Status Management**
- Slots automatically become **inactive** when fully booked
- Pre-save hook calculates `availableSlots = totalSlots - bookedSlots`
- Prevents overbooking through validation

---

## 📡 API Endpoints

### **1. Create Slots** (Hospital)
```
POST /api/organization/save-details
Authorization: Bearer <hospital_token>

Request Body:
{
  "organizationName": "Apollo Hospital",
  "address": "Mumbai",
  "doctors": [{
    "name": "Dr. Sharma",
    "specialization": "Cardiology",
    "availableDate": "2025-01-20",
    "timeFrom": "10:00",
    "timeTo": "11:00",
    "noOfTokens": 10
  }]
}

Response:
{
  "message": "Slots created successfully",
  "count": 1,
  "slots": [...]
}
```

### **2. Search Available Slots** (Patient)
```
GET /api/organization/available-slots?date=2025-01-20&location=Mumbai&specialization=Cardiology
Authorization: Bearer <user_token>

Response:
{
  "slots": [
    {
      "_id": "slot_id_here",
      "hospitalName": "Apollo Hospital",
      "doctorName": "Dr. Sharma",
      "specialization": "Cardiology",
      "timeSlot": "10:00 AM - 11:00 AM",
      "availableSlots": 7,
      "totalSlots": 10,
      "bookedSlots": 3,
      "isActive": true,
      "date": "2025-01-20",
      "location": "Mumbai"
    }
  ]
}
```

### **3. Book Appointment** (Patient)
```
POST /api/appointments
Authorization: Bearer <user_token>

Request Body:
{
  "slotId": "slot_id_from_search",
  "patientName": "John Doe",
  "contactNumber": "9876543210"
}

Response:
{
  "message": "Appointment booked successfully",
  "appointment": {...},
  "tokenNumber": 101,
  "remainingSlots": 6
}
```

### **4. View All Slots** (Hospital/Admin)
```
GET /api/organization/all-slots
Authorization: Bearer <hospital_token>

Response:
{
  "slots": [...]
}
```

---

## 🎨 Frontend Implementation

### **Book Appointment Page Flow**

1. **Enter Patient Details**
   - Patient name
   - Contact number (10 digits)

2. **Search for Slots**
   - Select date (tomorrow onwards)
   - Enter location
   - Enter specialization (optional)
   - Click "Search Available Slots"

3. **Select Slot from Dropdown**
   - Dropdown populated with available slots
   - Format: "Dr. Name - Time Slot (X slots available)"
   - Selecting shows full details (hospital, doctor, time, available count)

4. **Book Appointment**
   - Click "Book Appointment"
   - Real-time slot update occurs
   - Confirmation page shows:
     - Token number
     - Appointment details
     - Remaining slots count

5. **Auto-Refresh**
   - Slots refresh every 10 seconds automatically
   - Shows real-time availability changes

---

## 🔄 Real-Time Updates

### **How Real-Time Works:**

1. **On Booking:**
   ```javascript
   // Backend automatically:
   slot.bookedSlots += 1
   slot.availableSlots -= 1
   if (slot.availableSlots <= 0) {
     slot.isActive = false
   }
   await slot.save()
   ```

2. **Frontend Auto-Refresh:**
   ```javascript
   // Every 10 seconds:
   setInterval(() => {
     if (slotSection.visible) {
       searchSlots() // Re-fetch available slots
     }
   }, 10000)
   ```

3. **Immediate Feedback:**
   - Booking response includes `remainingSlots`
   - User sees updated count instantly
   - Other users see updates on next refresh/search

---

## 🗄️ Database Schema

### **Slot Model**
```javascript
{
  hospitalName: String (required),
  doctorName: String (required),
  specialization: String (required),
  location: String (required),
  date: Date (required),
  timeSlot: String (required),
  totalSlots: Number (default: 10),
  bookedSlots: Number (default: 0),
  availableSlots: Number (auto-calculated),
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

### **Appointment Model**
```javascript
{
  user: ObjectId (ref: User),
  slotId: ObjectId (ref: Slot),
  patientName: String,
  contactNumber: String,
  date: Date,
  location: String,
  organizationName: String,
  specialization: String,
  doctorName: String,
  timeSlot: String,
  tokenNumber: Number (auto-generated),
  status: String (default: "confirmed"),
  timestamps: true
}
```

---

## 🧪 Testing the System

### **Using the Test Page** (`test-slot-booking.html`)

1. **Open** `test-slot-booking.html` in browser
2. **Step 1:** Login as Hospital
   - Email: `hospital@test.com`
   - Password: `Test@123`
3. **Step 2:** Create a slot
   - Fill details or use defaults
   - Creates 10 slots automatically
4. **Step 3:** Login as User
   - Email: `user@test.com`
   - Password: `Test@123`
5. **Step 4:** Search Slots
   - Select date, location, specialization
   - View available slots in real-time
6. **Step 5:** Book Appointments
   - Copy slot ID from search results
   - Enter patient details
   - Book single or multiple appointments
7. **Step 6:** View All Slots
   - See slot status with progress bars
   - Monitor bookings in real-time

### **Auto-Refresh Testing**
- Click "Start Auto-Refresh" in Step 4
- Search results update every 3 seconds
- Shows real-time slot availability changes
- Click "Stop Auto-Refresh" to pause

---

## 🚀 Production Deployment

### **Environment Variables**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nextin
JWT_SECRET=your_super_secret_key
```

### **Start Server**
```bash
cd backend
node server.js
```

### **Access Points**
- Frontend: Open any HTML file in browser
- Test Dashboard: `test-slot-booking.html`
- API: `http://localhost:5000`

---

## 📊 Real-Time Features Summary

| Feature | Implementation | Update Frequency |
|---------|---------------|------------------|
| Slot Availability | Database-driven | Instant on booking |
| Search Results | API query | 10 seconds auto-refresh |
| Booking Confirmation | Immediate response | Real-time |
| Slot Status | Pre-save hook | Automatic on save |
| Dropdown Updates | Frontend refresh | On search/auto-refresh |
| Remaining Count | Response data | Shown immediately |

---

## ✅ Key Benefits

1. **No Overbooking:** Validation prevents booking full slots
2. **Real-Time Visibility:** Patients see current availability
3. **Automatic Management:** Slots auto-deactivate when full
4. **User-Friendly:** Dropdown selection instead of manual entry
5. **Instant Updates:** Booking confirmation shows remaining slots
6. **Auto-Refresh:** Frontend updates without manual refresh
7. **Scalable:** Supports multiple doctors, hospitals, and specializations

---

## 🎯 User Experience Flow

### **Hospital/Doctor:**
1. Login to system
2. Navigate to "Create Slot" page
3. Enter doctor details and time slots
4. System creates 10 appointment slots automatically
5. View bookings in real-time

### **Patient:**
1. Login to system
2. Navigate to "Book Appointment" page
3. Enter patient details (name, contact)
4. Search for available slots (date, location, specialization)
5. Select doctor from dropdown (shows available count)
6. View slot details
7. Click "Book Appointment"
8. Receive token number and confirmation
9. See remaining slots count

---

## 🔧 Maintenance

### **Monitoring Slots**
- Use GET `/api/organization/all-slots` to view all slots
- Check `isActive` status
- Monitor `bookedSlots` vs `totalSlots` ratio

### **Slot Cleanup**
- Past-date slots remain in database
- Can add cron job to archive old slots
- Or filter by date in queries

---

## 🎉 Success Indicators

✅ **Working Correctly When:**
- Dropdown shows only active slots
- Available count decrements on each booking
- Slot becomes inactive at 0 availability
- Real-time updates visible in search results
- Token numbers generated sequentially
- No duplicate bookings possible
- Auto-refresh shows changes automatically

---

## 📞 Support

For issues or questions:
1. Check server console for errors
2. Verify MongoDB connection
3. Check JWT token validity
4. Use test page for debugging
5. Monitor network requests in browser DevTools

---

**System Status:** ✅ Fully Operational
**Last Updated:** January 2025
**Version:** 1.0.0
