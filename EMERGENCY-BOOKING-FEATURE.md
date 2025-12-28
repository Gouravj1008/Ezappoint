# 🚨 Emergency Booking Feature Documentation

## Overview

The Emergency Booking feature allows patients to book urgent appointments with **priority processing**, **fast-track access**, and **guaranteed slot allocation**. Hospitals can create dedicated emergency slots, and the system automatically prioritizes emergency appointments over regular bookings.

---

## Features

### For Patients (Frontend)
✅ **Emergency Booking Toggle** - Easy one-click switch to emergency mode  
✅ **Reason Input** - Describe the medical emergency for context  
✅ **Priority Confirmation** - Visual indication of priority status  
✅ **Fast Track Access** - Get seen faster than regular appointments  
✅ **Guaranteed Allocation** - Emergency appointments override full slots  
✅ **Visual Feedback** - Red gradient styling for immediate recognition  

### For Hospitals (Backend)
✅ **Emergency Slot Creation** - Mark specific time slots as emergency slots  
✅ **Priority Queue Management** - System automatically prioritizes emergency cases  
✅ **Flexible Booking** - Override capacity limits for critical cases  
✅ **Emergency Dashboard** - Filter and view emergency appointments separately  
✅ **Immediate Confirmation** - Emergency appointments confirmed instantly  

---

## Database Schema Changes

### Appointment Model
```javascript
{
  // ... existing fields ...
  isEmergency: { type: Boolean, default: false },        // Flag for emergency appointment
  emergencyReason: { type: String, default: "" },        // Why emergency booking was needed
  priorityLevel: { type: Number, default: 0 },           // 0=normal, 100=emergency
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"] }
}
```

### Slot Model
```javascript
{
  // ... existing fields ...
  isEmergencySlot: { type: Boolean, default: false }     // Flag for emergency slot
}
```

---

## API Endpoints

### 1. Book Emergency Appointment
**Endpoint:** `POST /api/appointments`  
**Authentication:** Required (JWT Token)  
**Purpose:** Create an emergency appointment

**Request Body:**
```json
{
  "slotId": "ObjectId",
  "patientName": "John Doe",
  "contactNumber": "9876543210",
  "isEmergency": true,
  "emergencyReason": "Severe chest pain and difficulty breathing"
}
```

**Response (Success):**
```json
{
  "message": "🚨 Emergency appointment booked with high priority!",
  "appointment": {
    "_id": "ObjectId",
    "patientName": "John Doe",
    "contactNumber": "9876543210",
    "isEmergency": true,
    "emergencyReason": "Severe chest pain and difficulty breathing",
    "priorityLevel": 100,
    "status": "confirmed",
    "tokenNumber": 1,
    "createdAt": "2025-12-27T10:30:00Z"
  },
  "tokenNumber": 1,
  "remainingSlots": 4,
  "isEmergency": true,
  "priorityLevel": 100
}
```

**Response (Error):**
```json
{
  "message": "Please provide a reason for emergency booking."
}
```

---

### 2. Get Emergency Appointments (Hospital/Admin)
**Endpoint:** `GET /api/appointments/emergency/all`  
**Authentication:** Required (JWT Token)  
**Purpose:** View all emergency appointments

**Response:**
```json
{
  "message": "Emergency appointments retrieved",
  "count": 5,
  "appointments": [
    {
      "_id": "ObjectId",
      "patientName": "John Doe",
      "doctorName": "Dr. Smith",
      "isEmergency": true,
      "emergencyReason": "Severe chest pain",
      "priorityLevel": 100,
      "status": "confirmed",
      "createdAt": "2025-12-27T10:30:00Z"
    },
    // ... more appointments ...
  ]
}
```

---

### 3. Get User's Emergency Appointments
**Endpoint:** `GET /api/appointments/emergency/my`  
**Authentication:** Required (JWT Token)  
**Purpose:** View current user's emergency appointments

**Response:**
```json
{
  "message": "User emergency appointments retrieved",
  "count": 1,
  "appointments": [
    {
      "_id": "ObjectId",
      "patientName": "John Doe",
      "doctorName": "Dr. Smith",
      "isEmergency": true,
      "emergencyReason": "Severe chest pain",
      "tokenNumber": 1,
      "createdAt": "2025-12-27T10:30:00Z"
    }
  ]
}
```

---

### 4. Create Emergency Slot
**Endpoint:** `POST /api/organization/save-details`  
**Authentication:** Required (JWT Token)  
**Purpose:** Create a new emergency slot

**Request Body:**
```json
{
  "organizationName": "City Hospital",
  "address": "Mumbai",
  "isEmergencySlot": true,
  "doctors": [
    {
      "name": "Dr. Smith",
      "specialization": "Cardiology",
      "availableDate": "2025-12-28",
      "timeFrom": "09:00",
      "timeTo": "12:00",
      "noOfTokens": 5
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "🚨 Emergency Slots created successfully!",
  "slotType": "emergency",
  "slots": [
    {
      "_id": "ObjectId",
      "hospitalName": "City Hospital",
      "doctorName": "Dr. Smith",
      "specialization": "Cardiology",
      "location": "Mumbai",
      "date": "2025-12-28",
      "timeSlot": "09:00 - 12:00",
      "totalSlots": 5,
      "availableSlots": 5,
      "isEmergencySlot": true,
      "isActive": true
    }
  ]
}
```

---

### 5. Get Emergency Slots
**Endpoint:** `GET /api/organization/emergency-slots`  
**Query Parameters:** `date`, `location`, `specialization`  
**Purpose:** Fetch available emergency slots

**Response:**
```json
{
  "success": true,
  "count": 3,
  "message": "Emergency slots retrieved",
  "slots": [
    {
      "_id": "ObjectId",
      "hospitalName": "City Hospital",
      "doctorName": "Dr. Smith",
      "specialization": "Cardiology",
      "timeSlot": "09:00 - 12:00",
      "availableSlots": 5,
      "isEmergencySlot": true
    }
  ]
}
```

---

## Frontend Changes

### Book Appointment Page (`Book Appointment.html`)

#### New UI Elements
1. **Emergency Toggle Button**
   - Red gradient background (#ff6b6b to #ee5a6f)
   - Pulsing animation to draw attention
   - State-based text: "🚨 Emergency Booking" / "✅ Emergency Mode Active"

2. **Emergency Information Section**
   - Displays when emergency mode is active
   - Shows benefits: Priority Access, Fast Track, Guaranteed Slots
   - Color-coded with warning gradient

3. **Emergency Reason Textarea**
   - Required field when emergency mode is active
   - Placeholder: "Please describe your medical emergency"
   - Validates that reason is provided before booking

4. **Emergency Confirmation Badge**
   - Shows in confirmation page if booking was emergency
   - Red gradient styling for visibility
   - Text: "🚨 EMERGENCY APPOINTMENT - HIGH PRIORITY 🚨"

#### JavaScript Changes
```javascript
// Toggle emergency mode
let isEmergencyMode = false;

function toggleEmergencyMode() {
    isEmergencyMode = !isEmergencyMode;
    const emergencySection = document.getElementById("emergencySection");
    const emergencyBtn = document.getElementById("emergencyBtn");
    
    if (isEmergencyMode) {
        emergencySection.classList.add("show");
        emergencyBtn.classList.add("active");
        emergencyBtn.textContent = "✅ Emergency Mode Active";
    } else {
        emergencySection.classList.remove("show");
        emergencyBtn.classList.remove("active");
        emergencyBtn.textContent = "🚨 Emergency Booking";
        document.getElementById("emergencyReason").value = "";
    }
}

// Booking request includes emergency data
const data = {
    slotId: selectedSlot._id,
    patientName,
    contactNumber,
    isEmergency: isEmergencyMode,
    emergencyReason: isEmergencyMode ? 
        document.getElementById("emergencyReason").value.trim() : ""
};
```

#### CSS Styling
```css
.emergency-section {
    background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
    padding: 20px;
    border-radius: 8px;
    color: white;
}

.emergency-toggle {
    background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
    font-weight: bold;
    width: 100%;
}

.emergency-toggle.active {
    background: linear-gradient(135deg, #ff4444, #cc0000);
}

.priority-badge {
    display: inline-block;
    background: #ffd700;
    color: #333;
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: bold;
}
```

---

### Slot Booking Page (`SLot Booking.html`)

#### New UI Elements
1. **Emergency Slot Toggle**
   - Red gradient button
   - Text: "🚨 Create Emergency Slot" / "✅ Emergency Slot Enabled"

2. **Emergency Slot Information**
   - Explains what emergency slots are
   - Benefits for critical cases
   - Shows it overrides full slots

#### JavaScript Changes
```javascript
let isEmergencySlot = false;

function toggleEmergencyMode() {
    isEmergencySlot = !isEmergencySlot;
    const emergencyInfo = document.getElementById("emergencyInfo");
    const emergencyToggle = document.getElementById("emergencyToggle");
    
    if (isEmergencySlot) {
        emergencyInfo.classList.add("show");
        emergencyToggle.classList.add("active");
        emergencyToggle.textContent = "✅ Emergency Slot Enabled";
    } else {
        emergencyInfo.classList.remove("show");
        emergencyToggle.classList.remove("active");
        emergencyToggle.textContent = "🚨 Create Emergency Slot";
    }
}

// Slot creation includes emergency flag
const data = {
    organizationName: document.getElementById("hospital-name").value,
    address: document.getElementById("address").value,
    isEmergencySlot: isEmergencySlot,
    doctors: [...]
};
```

---

## Backend Changes

### Appointment Route (`routes/appointments.js`)

#### Modified POST /api/appointments
- Accepts `isEmergency` and `emergencyReason` parameters
- Allows emergency bookings to override full slots
- Sets `priorityLevel` to 100 for emergency appointments
- Automatically confirms emergency appointments (`status: "confirmed"`)
- Returns `isEmergency` and `priorityLevel` in response

#### New Endpoints
- `GET /api/appointments/emergency/all` - All emergency appointments
- `GET /api/appointments/emergency/my` - User's emergency appointments

#### Logic Changes
```javascript
// Emergency logic
if (isEmergency && slot.availableSlots < 0) {
    return res.status(400).json({ 
        message: "Emergency slot creation limit reached" 
    });
}

// Set priority
const priorityLevel = isEmergency ? 100 : 0;

// Immediate confirmation for emergency
status: isEmergency ? "confirmed" : "pending"
```

---

### Organization Route (`routes/organization.js`)

#### Modified POST /api/organization/save-details
- Accepts `isEmergencySlot` parameter
- Creates slots with `isEmergencySlot` flag
- Returns `slotType` in response

#### New Endpoints
- `GET /api/organization/emergency-slots` - Get emergency slots only

#### Logic Changes
```javascript
const slot = await Slot.create({
    // ... existing fields ...
    isEmergencySlot: isEmergencySlot || false,
    // ... rest of fields ...
});
```

---

### Models

#### Appointment Model (`models/Appointment.js`)
New fields added:
- `isEmergency: Boolean (default: false)`
- `emergencyReason: String (default: "")`
- `priorityLevel: Number (default: 0)` - Emergency=100, Normal=0

#### Slot Model (`models/Slot.js`)
New field added:
- `isEmergencySlot: Boolean (default: false)`

---

## User Workflows

### Patient Emergency Booking Flow

```
1. Open "Book Appointment.html"
   │
2. Fill basic info: Patient Name, Contact Number
   │
3. Click "🚨 Emergency Booking" button
   │
4. Emergency section appears with benefits info
   │
5. Enter emergency reason (e.g., "Severe chest pain")
   │
6. Search for available slots (date, location, specialization)
   │
7. Select a slot from dropdown
   │
8. Click "Book Appointment" button
   │
9. System validates emergency reason
   │
10. Backend prioritizes emergency appointment
    │
11. Automatic confirmation (no pending status)
    │
12. Show confirmation with:
    - Token number
    - 🚨 EMERGENCY PRIORITY BADGE
    - All appointment details
    │
13. User can view in "View Appointments"
```

### Hospital Emergency Slot Creation Flow

```
1. Open "SLot Booking.html"
   │
2. Fill hospital and doctor details
   │
3. Click "🚨 Create Emergency Slot" button
   │
4. Emergency information appears
   │
5. Fill date, time, number of tokens
   │
6. Click "Create Slot"
   │
7. Backend creates slot with isEmergencySlot: true
   │
8. Success message: "✅ 🚨 Emergency Slot created successfully!"
   │
9. Hospital can use this slot for emergency bookings
   │
10. System shows it's available for emergency appointments
```

---

## Priority Sorting

Emergency appointments are automatically sorted by priority:

```javascript
// Get all appointments sorted by priority
router.get("/all", authMiddleware, async (req, res) => {
  const appts = await Appointment.find()
    .sort({ 
      priorityLevel: -1,    // Emergency first (100 > 0)
      createdAt: -1         // Then by creation date
    });
  // Emergency appointments appear first in the queue
});
```

---

## Status Management

### Emergency Appointment Status
- **Created:** `confirmed` (not pending)
- **No waiting period** for confirmation
- **Priority indication:** `priorityLevel: 100`
- **Queue position:** Always at front (sorted by priorityLevel)

### Regular Appointment Status
- **Created:** `pending`
- **Requires:** Hospital confirmation
- **Priority indication:** `priorityLevel: 0`
- **Queue position:** After emergency appointments

---

## Security Considerations

1. **JWT Authentication Required**
   - All emergency booking endpoints require valid JWT token
   - Only authenticated users can book appointments
   - Only hospital staff can create emergency slots

2. **Input Validation**
   - Emergency reason must be provided and non-empty
   - Contact number validation (10 digits)
   - Patient name validation (letters only)
   - Date/time validation

3. **Rate Limiting (Optional)**
   - Consider limiting emergency bookings per user per day
   - Prevent abuse of emergency slot system

4. **Audit Trail**
   - All emergency appointments stored with:
     - Creation timestamp
     - Emergency reason
     - User ID
     - Created by hospital ID

---

## Testing Scenarios

### Test Case 1: Emergency Booking with Valid Data
```javascript
POST /api/appointments
{
  "slotId": "valid_slot_id",
  "patientName": "John Doe",
  "contactNumber": "9876543210",
  "isEmergency": true,
  "emergencyReason": "Severe headache and fever"
}

Expected Response: 201 Created
- status: "confirmed" (not pending)
- isEmergency: true
- priorityLevel: 100
```

### Test Case 2: Emergency Booking without Reason
```javascript
POST /api/appointments
{
  "slotId": "valid_slot_id",
  "patientName": "John Doe",
  "contactNumber": "9876543210",
  "isEmergency": true,
  "emergencyReason": ""  // Empty reason
}

Expected Response: 400 Bad Request
"Please provide a reason for emergency booking."
```

### Test Case 3: Emergency Slot Creation
```javascript
POST /api/organization/save-details
{
  "organizationName": "City Hospital",
  "address": "Mumbai",
  "isEmergencySlot": true,
  "doctors": [...]
}

Expected Response: 201 Created
- slotType: "emergency"
- slots[0].isEmergencySlot: true
```

### Test Case 4: Get Emergency Appointments
```javascript
GET /api/appointments/emergency/all

Expected Response: 200 OK
- count: (number of emergency appointments)
- appointments: (sorted by creation date, most recent first)
```

---

## Monitoring & Analytics

### Key Metrics to Track
- Emergency appointments per day/week/month
- Average response time for emergency appointments
- Emergency appointment completion rate
- Peak hours for emergency bookings
- Most common emergency reasons
- Doctor/specialization utilization for emergency cases

### Sample Query
```javascript
// Find emergency appointments in last 7 days
Appointment.find({
  isEmergency: true,
  createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
}).sort({ createdAt: -1 })
```

---

## Future Enhancements

1. **SMS/Email Notifications**
   - Immediate SMS to patient for emergency booking confirmation
   - Hospital staff notification for emergency appointments

2. **Emergency Queue Analytics**
   - Dashboard showing active emergency cases
   - Estimated wait times
   - Doctor availability for emergency cases

3. **Multi-Level Priority System**
   - Level 1: Critical (trauma, severe symptoms)
   - Level 2: Urgent (moderate symptoms)
   - Level 3: Standard (routine)

4. **Integration with Medical Records**
   - Pre-fill emergency reason from medical history
   - Flag patients with chronic conditions
   - Alert doctors about pre-existing conditions

5. **Payment Processing**
   - Premium pricing for emergency slots
   - Instant payment processing
   - Automatic refund policy for cancelled emergency appointments

6. **Real-time Status Updates**
   - WebSocket updates for emergency appointment status
   - Live queue position indicator
   - Doctor status (waiting, in consultation, delayed)

---

## Troubleshooting

### Issue: Emergency appointment not being confirmed
**Solution:** Check that `isEmergency: true` is being sent in request body

### Issue: Emergency button not appearing
**Solution:** Ensure JavaScript is loaded after page load (use DOMContentLoaded event)

### Issue: Emergency slots not available
**Solution:** Verify slots were created with `isEmergencySlot: true` flag

### Issue: User cannot select emergency reason
**Solution:** Check textarea element with id="emergencyReason" exists in HTML

### Issue: Priority sorting not working
**Solution:** Verify Appointment query includes `.sort({ priorityLevel: -1 })`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-27 | Initial emergency booking feature implementation |

---

## Support & Maintenance

For issues or questions about the emergency booking feature:
1. Check this documentation
2. Review API response messages for specific errors
3. Check browser console for JavaScript errors
4. Review server logs for backend errors
5. Verify database fields are properly set

---

**Last Updated:** December 27, 2025  
**Status:** ✅ Production Ready  
**Maintainer:** NextIn Development Team

---
