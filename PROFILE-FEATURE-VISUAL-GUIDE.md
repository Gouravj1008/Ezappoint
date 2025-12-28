# 📊 User & Admin Profile Feature - Visual Guide & Flow Diagrams

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXTIN APPLICATION                       │
│              (Appointment Booking System)                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Index Page  │
                    │  (Chatbot AI) │
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        ┌──────────────────┐   ┌──────────────────┐
        │  User Login      │   │  Admin Login     │
        │  (Hospital       │   │  (Hospital       │
        │   Login.html)    │   │   Sign up.html)  │
        └────────┬─────────┘   └────────┬─────────┘
                 │                      │
                 │ Authentication       │ Authentication
                 │ POST /api/auth/login │ POST /api/auth/login
                 │                      │
                 ▼                      ▼
        ┌──────────────────┐   ┌──────────────────┐
        │ User Profile     │   │ Admin Profile    │
        │ Page             │   │ Page             │
        │ (user deatils    │   │ (admin-profile   │
        │  .html)          │   │  .html)          │
        └────────┬─────────┘   └────────┬─────────┘
                 │                      │
     ┌───────────┼───────────┐  ┌───────┼────────┐
     │           │           │  │       │        │
     ▼           ▼           ▼  ▼       ▼        ▼
  ┌──┐      ┌──────┐   ┌──────┐ ┌──────┐   ┌─────┐
  │📷│      │✏️Edit│   │📋View│ │📋All│    │🆘Em│
  │  │      │      │   │Recent│ │Appt│    │ergency
  └──┘      └──────┘   └──────┘ └──────┘   └─────┘
```

---

## User Profile Page Architecture

```
USER PROFILE PAGE (user deatils.html)
├─ Navigation Bar
│  ├─ Logo
│  ├─ Book Appointment [Link]
│  ├─ My Appointments [Link]
│  └─ Logout [Button]
│
├─ Profile Header
│  ├─ Profile Image (150x150px circular)
│  │  ├─ Fallback: User Initials
│  │  └─ Camera Icon [Upload Button]
│  │
│  ├─ User Information
│  │  ├─ Name
│  │  ├─ Email
│  │  └─ Edit Profile [Button]
│  │
│  └─ Detail Cards
│     ├─ Phone Number
│     ├─ Location
│     └─ Member Since Date
│
├─ Statistics Dashboard
│  ├─ Total Appointments [Card]
│  ├─ Confirmed [Card]
│  └─ Completed [Card]
│
├─ Recent Appointments
│  ├─ Appointment Card 1
│  │  ├─ Doctor Name
│  │  ├─ Hospital
│  │  ├─ Specialization
│  │  ├─ Date & Time
│  │  ├─ Token Number
│  │  └─ Status Badge
│  ├─ Appointment Card 2
│  │  └─ [Same structure]
│  └─ Appointment Card 3
│     └─ [Same structure]
│
└─ Edit Profile Modal (Hidden)
   ├─ Full Name [Text Input]
   ├─ Email [Email Input]
   ├─ Phone Number [Tel Input]
   ├─ Location [Text Input]
   ├─ Bio [Textarea]
   ├─ Save Changes [Button]
   └─ Cancel [Button]
```

---

## Admin Profile Page Architecture

```
ADMIN PROFILE PAGE (admin-profile.html)
├─ Navigation Bar
│  ├─ Logo
│  ├─ Create Slots [Link]
│  ├─ All Appointments [Link]
│  └─ Logout [Button]
│
├─ Admin Header
│  ├─ Admin Badge [HOSPITAL ADMINISTRATOR - Red]
│  │
│  ├─ Profile Section
│  │  ├─ Profile Image (150x150px)
│  │  │  ├─ Fallback: Admin Initials
│  │  │  └─ Camera Icon [Upload Button]
│  │  │
│  │  └─ Admin Info
│  │     ├─ Admin Name
│  │     ├─ Email
│  │     └─ Edit Profile [Button]
│  │
│  └─ Hospital Information Cards
│     ├─ Hospital Name
│     ├─ Phone Number
│     └─ Member Since Date
│
├─ Hospital Statistics Dashboard
│  ├─ Total Slots Created [Card with Number]
│  ├─ Total Appointments [Card with Number]
│  ├─ Emergency Bookings [Card with Number + Red]
│  └─ Confirmed [Card with Number]
│
├─ Recent Appointments (Last 6)
│  ├─ Appointment Card 1
│  │  ├─ [Optional] 🚨 Emergency Badge
│  │  ├─ Doctor Name
│  │  ├─ Patient Name
│  │  ├─ Patient Contact
│  │  ├─ Date & Time
│  │  ├─ Token Number
│  │  └─ Status Badge
│  ├─ Appointment Card 2-6
│  │  └─ [Same structure]
│  │
│  └─ Note: Emergency appointments marked with 🚨
│
└─ Edit Profile Modal (Hidden)
   ├─ Admin Name [Text Input]
   ├─ Email [Email Input]
   ├─ Phone Number [Tel Input]
   ├─ Hospital Name [Text Input]
   ├─ Save Changes [Button]
   └─ Cancel [Button]
```

---

## Data Flow Diagram

```
FRONTEND                        BACKEND                      DATABASE
┌──────────────┐              ┌────────────┐              ┌──────────┐
│  User Page   │              │  Node.js   │              │ MongoDB  │
│  ─────────── │              │  Express   │              │ ─────────│
│              │              │            │              │          │
│ 1. Load Page │──────────────▶ /page load │              │          │
│              │              │            │              │          │
│              │              │ 2. Check   │              │          │
│              │              │    Token   │              │          │
│              │  ◀──────────  │            │              │          │
│ 3. Show      │  (Fallback   │            │              │          │
│    Profile   │   Data)      │            │              │          │
│              │              │            │              │          │
│ 4. User      │              │            │              │          │
│    Clicks    │              │            │              │          │
│    Upload    │              │            │              │          │
│              │              │            │              │          │
│ 5. Select    │              │            │              │          │
│    File      │              │            │              │          │
│              │              │            │              │          │
│ 6. Convert   │──────────────▶ /update    │              │          │
│    to        │ PUT profile   │ -profile   │──────────────▶ Save     │
│    Base64    │ ◀─────────────│  (Save)   │              │ Image    │
│              │ (Response)   │            │              │ & Data   │
│ 7. Display   │              │            │              │          │
│    Image     │              │            │              │          │
│              │              │            │              │          │
│ 8. Show      │              │            │              │          │
│    Success   │              │            │              │          │
│              │              │            │              │          │
└──────────────┘              └────────────┘              └──────────┘
```

---

## Authentication & Token Flow

```
LOGIN PROCESS
═════════════

1. User enters credentials
   ├─ Username: john_doe
   ├─ Password: secret123
   └─ (Submit form)
   
2. POST /api/auth/login
   └─ { username, password }
   
3. Backend validates
   ├─ Find user by username
   ├─ Compare password hash
   └─ Generate JWT token
   
4. Response
   └─ { token: "eyJhbGciOi..." }
   
5. Frontend stores token
   └─ localStorage.setItem('token', token)
   
6. Redirect to profile page
   └─ window.location.href = "user deatils.html"
   
7. Load profile page
   └─ GET /api/auth/profile
      └─ Authorization: Bearer <token>
      
8. Backend validates token
   ├─ Extract token from header
   ├─ Verify JWT signature
   ├─ Get user ID from payload
   └─ Fetch user from database
   
9. Return profile data
   └─ { username, email, profileImage, ... }
   
10. Display profile
    └─ Update DOM with profile information
```

---

## Image Upload Process

```
IMAGE UPLOAD FLOW
═════════════════

1. User clicks 📷 button
   │
2. File input opens
   │ (Browser file selection dialog)
   │
3. User selects image
   │ (JPG, PNG, GIF, or WebP)
   │
4. handleImageUpload() triggered
   │
   ├─ FileReader object created
   │
   ├─ File read as DataURL
   │ └─ Converts to: data:image/png;base64,...
   │
   ├─ Update DOM preview
   │ └─ Shows image immediately
   │
   ├─ Call updateProfileImage()
   │
   └─ Send PUT request
      ├─ URL: /api/auth/update-profile
      ├─ Method: PUT
      ├─ Headers: Authorization: Bearer <token>
      └─ Body: { profileImage: "data:image/..." }
      
5. Backend processes
   │
   ├─ Validate token
   │
   ├─ Find user
   │
   ├─ Save Base64 image to database
   │
   └─ Return success response
      
6. Frontend receives response
   │
   ├─ Update profileImage field
   │
   ├─ Display success message
   │ └─ "Profile picture updated successfully!"
   │
   └─ Show in database
      └─ Image persists after page reload
```

---

## Edit Profile Modal Flow

```
EDIT PROFILE MODAL FLOW
═══════════════════════

┌─────────────────────────────────┐
│ User clicks "Edit Profile"      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ openEditModal() function runs    │
│ ─────────────────────────────────│
│ 1. Find modal element            │
│ 2. Pre-fill current values       │
│ 3. Set display: block            │
│ 4. Focus on first input          │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Modal appears on screen         │
│ ─────────────────────────────────│
│  ┌─────────────────────────────┐ │
│  │ Edit Profile       [✕]      │ │
│  ├─────────────────────────────┤ │
│  │ Full Name: [john_doe___]    │ │
│  │ Email: [john@example.com]   │ │
│  │ Phone: [9876543210______]   │ │
│  │ Location: [New York____]    │ │
│  │ Bio: [________________]     │ │
│  │                             │ │
│  │ [💾 Save]  [Cancel]         │ │
│  └─────────────────────────────┘ │
└────────────┬────────────────────┘
             │
      ┌──────┴──────┐
      │             │
   Save        Cancel
      │             │
      ▼             ▼
Validate      closeEditModal()
Input         ─────────────────
      │        Set display: none
      │
   Valid?
      │
   ┌──┴──┐
   │     │
  YES   NO
   │     │
   │     └─▶ Show error
   │        message
   │
   ▼
PUT /api/auth/update-profile
{
  username: new_username,
  email: new_email,
  phoneNumber: new_phone,
  location: new_location,
  bio: new_bio
}
   │
   ▼
Backend validates & saves
   │
   ▼
Return updated user object
   │
   ▼
Frontend updates:
1. Close modal
2. Update display
3. Show success message
4. Auto-dismiss after 3s
```

---

## Statistics Calculation

```
APPOINTMENT STATISTICS
══════════════════════

User Statistics
───────────────
Step 1: Load all user appointments
        GET /api/appointments/my

Step 2: Count appointments by status
        ├─ Total: count all appointments
        ├─ Confirmed: count where status = "Confirmed"
        └─ Completed: count where status = "Completed"

Step 3: Display in statistics cards
        ┌──────────┬──────────┬──────────┐
        │  Total   │Confirmed │Completed │
        │    12    │    8     │    5     │
        └──────────┴──────────┴──────────┘

Admin Statistics
────────────────
Step 1: Load hospital appointments
        GET /api/appointments/all

Step 2: Count different metrics
        ├─ Total Slots: count created slots
        ├─ Total Appointments: count all bookings
        ├─ Emergency Bookings: count where emergency = true
        └─ Confirmed: count where status = "Confirmed"

Step 3: Display in statistics cards
        ┌────────┬────────────┬──────────┬──────────┐
        │ Slots  │ Appointments│Emergency │Confirmed │
        │   50   │     42      │    5     │    35    │
        └────────┴────────────┴──────────┴──────────┘
```

---

## Mobile Responsive Design

```
RESPONSIVE BREAKPOINTS
══════════════════════

Desktop View (> 768px)
┌──────────────────────────────────────┐
│           Navigation Bar              │
├──────────────────────────────────────┤
│         Profile Header (Flex)         │
│  [Image] [Name, Email] [Edit Button] │
├──────────────────────────────────────┤
│      Detail Cards (4 columns)         │
│ [Card1] [Card2] [Card3] [Card4]      │
├──────────────────────────────────────┤
│  Statistics (3 columns, side-by-side)│
│    [Total] [Confirmed] [Completed]   │
├──────────────────────────────────────┤
│  Recent Appointments (3 columns)     │
│ [Card1] [Card2] [Card3]              │
│ [Card4] [Card5] [Card6]              │
└──────────────────────────────────────┘

Tablet View (< 768px)
┌──────────────────────────────┐
│    Navigation Bar            │
├──────────────────────────────┤
│  Profile Header (Centered)   │
│     [Image]                  │
│    [Name, Email]             │
│   [Edit Button]              │
├──────────────────────────────┤
│  Detail Cards (2 columns)    │
│   [Card1] [Card2]            │
│   [Card3] [Card4]            │
├──────────────────────────────┤
│ Statistics (2 columns)       │
│  [Total] [Confirmed]         │
│  [Completed]                 │
├──────────────────────────────┤
│ Appointments (2 columns)     │
│   [Card1] [Card2]            │
│   [Card3] [Card4]            │
└──────────────────────────────┘

Mobile View (< 480px)
┌────────────────────┐
│  Navigation (Menu) │
├────────────────────┤
│  Profile Header    │
│  (Centered, Stack) │
│    [Image]         │
│   [Name, Email]    │
│  [Edit Button]     │
├────────────────────┤
│  Detail Cards      │
│  (1 column)        │
│   [Card1]          │
│   [Card2]          │
│   [Card3]          │
│   [Card4]          │
├────────────────────┤
│  Statistics        │
│  (Stacked)         │
│   [Total]          │
│ [Confirmed]        │
│ [Completed]        │
├────────────────────┤
│ Appointments       │
│  (1 column)        │
│   [Card1]          │
│   [Card2]          │
│   [Card3]          │
│   [Card4]          │
└────────────────────┘
```

---

## Database Schema Visualization

```
MONGODB USER COLLECTION
═══════════════════════

User Document Structure:

{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  
  // Authentication Fields
  "username": "john_doe",
  "passwordHash": "$2b$10$...",
  
  // Contact Information
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "location": "New York, USA",
  
  // Profile Fields ✨ NEW
  "profileImage": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "bio": "Health enthusiast, fitness lover",
  
  // Role & Organization
  "isAdmin": false,
  "hospitalName": "",
  
  // Metadata
  "registrationDate": "12/27/2025",
  "createdAt": ISODate("2025-12-27T10:30:00.000Z"),
  "updatedAt": ISODate("2025-12-27T15:45:00.000Z")
}

Admin User Document Example:

{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  
  // Authentication
  "username": "hospital_admin",
  "passwordHash": "$2b$10$...",
  
  // Contact Info
  "email": "admin@cityhospital.com",
  "phoneNumber": "9123456789",
  "location": "City Hospital, NYC",
  
  // Profile Fields ✨ NEW
  "profileImage": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "bio": "",
  
  // Admin-Specific
  "isAdmin": true,
  "hospitalName": "City Hospital",
  
  // Metadata
  "registrationDate": "12/20/2025",
  "createdAt": ISODate("2025-12-20T08:00:00.000Z"),
  "updatedAt": ISODate("2025-12-27T16:00:00.000Z")
}
```

---

## File Dependencies

```
FRONTEND DEPENDENCIES
══════════════════════

user deatils.html
├── Requires: JWT token in localStorage
├── Depends on: GET /api/auth/profile
├── Depends on: GET /api/appointments/my
├── Depends on: PUT /api/auth/update-profile
├── Styling: Internal CSS (Gradient, Responsive)
└── Scripts: Internal JavaScript (Fetch, DOM)

admin-profile.html
├── Requires: JWT token in localStorage
├── Depends on: GET /api/auth/profile
├── Depends on: GET /api/appointments/all
├── Depends on: PUT /api/auth/update-profile
├── Styling: Internal CSS (Admin-themed)
└── Scripts: Internal JavaScript (Fetch, DOM)

User login.html
├── Depends on: POST /api/auth/login
├── Redirects to: user deatils.html (on success)
└── Token storage: localStorage.setItem('token', ...)

Hospital Login.html
├── Depends on: POST /api/auth/login
├── Redirects to: admin-profile.html (on success)
└── Token storage: localStorage.setItem('token', ...)

BACKEND DEPENDENCIES
════════════════════

backend/routes/auth.js
├── Imports: express, bcrypt, jwt, User model
├── Endpoints:
│  ├── POST /signup
│  ├── POST /login
│  ├── GET /profile ✨ NEW
│  └── PUT /update-profile ✨ NEW
└── Depends on: JWT_SECRET environment variable

backend/models/User.js
├── Enhanced with: profileImage, bio, isAdmin, hospitalName, registrationDate
├── Used by: auth.js routes
└── Connected to: MongoDB database

DATABASE DEPENDENCIES
═════════════════════

MongoDB User Collection
├── Fields: 9 (was 5, added 4 new)
├── Used by: GET /profile endpoint
├── Used by: PUT /update-profile endpoint
└── Stores: Base64 images (can grow large)
```

---

## Error Handling Flow

```
ERROR HANDLING CASCADE
══════════════════════

API Call
  │
  ├─ Network Error
  │  │
  │  └─▶ Show: "Network error - check connection"
  │
  ├─ 401 Unauthorized
  │  │ (Token invalid/expired)
  │  │
  │  └─▶ Clear token
  │       Redirect to login
  │       Show: "Please login again"
  │
  ├─ 404 Not Found
  │  │ (User profile not found)
  │  │
  │  └─▶ Show: "User profile not found"
  │       Fallback to offline data
  │
  ├─ 400 Bad Request
  │  │ (Validation error)
  │  │
  │  └─▶ Show: Specific error message
  │       Example: "Email already in use"
  │
  ├─ 500 Server Error
  │  │ (Server error)
  │  │
  │  └─▶ Show: "Server error - try again later"
  │       Log error to console
  │
  └─ Success (200)
     │
     └─▶ Update profile
         Show success message
         Auto-dismiss after 3s
```

---

## Security Architecture

```
SECURITY LAYERS
═══════════════

Layer 1: Frontend
├─ Token stored in localStorage
├─ Token sent in Authorization header
├─ File type validation on image upload
└─ Form validation before submit

Layer 2: Transport
├─ HTTPS (recommended)
├─ CORS headers
└─ Base64 encoding for images

Layer 3: Backend
├─ JWT signature verification
├─ Token expiration check (7 days)
├─ User existence validation
├─ Email uniqueness validation
├─ Password hashing with bcrypt
└─ Input sanitization

Layer 4: Database
├─ MongoDB queries with proper indexes
├─ Role-based access (isAdmin flag)
├─ Field-level permissions
└─ No sensitive data in responses

Layer 5: Data
├─ Base64 prevents script execution
├─ Password never stored plain text
├─ Tokens signed with secret
└─ Sensitive fields not logged
```

---

## Performance Optimization

```
PERFORMANCE METRICS
═══════════════════

Profile Load: < 2s
├─ Fetch user data
├─ Parse JWT (fallback)
├─ Render profile
└─ Load appointments

Image Upload: < 5s
├─ File selection
├─ Base64 conversion
├─ API send
├─ Server save
└─ Display update

Edit Profile: < 2s
├─ Form validation
├─ API request
├─ Server processing
├─ Response handling
└─ DOM update

Caching Strategy:
├─ JWT in localStorage
├─ Profile data in variables
├─ Appointments cached on load
└─ Images cached by browser

Optimization Techniques:
├─ Lazy load images
├─ Minify CSS/JavaScript
├─ Use CSS Grid for layout
├─ Cache API responses
└─ Debounce input handlers
```

---

This visual guide helps developers understand the complete architecture and flow of the User & Admin Profile Feature!
