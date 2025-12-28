# 👤 User & Admin Profile Feature Documentation

## Overview

The User & Admin Profile Feature provides comprehensive account management with profile pictures, detailed information displays, and separate interfaces for regular users and hospital administrators. Each user type has a customized profile page with relevant information and controls.

---

## Features

### For Users (Patients)
✅ **Profile Image Upload** - Upload and display profile pictures  
✅ **Personal Information** - Username, email, phone, location, bio  
✅ **Appointment History** - View all past and upcoming appointments  
✅ **Statistics** - Total appointments, confirmed, completed counts  
✅ **Edit Profile** - Update personal information anytime  
✅ **Quick Navigation** - Easy access to booking and appointments  

### For Admins (Hospital Staff)
✅ **Admin Profile** - Hospital name, admin details, contact info  
✅ **Hospital Statistics** - Total slots, appointments, emergency bookings  
✅ **Appointment Management** - View all hospital appointments  
✅ **Emergency Tracking** - See all emergency bookings separately  
✅ **Profile Management** - Edit admin and hospital information  
✅ **Dashboard Links** - Quick access to slot creation and management  

---

## Database Schema Updates

### User Model (`backend/models/User.js`)
```javascript
{
  // Existing fields
  username: String,
  phoneNumber: String,
  email: String,
  location: String,
  passwordHash: String,

  // New fields
  profileImage: String,          // Base64 encoded image
  bio: String,                   // User bio/description
  isAdmin: Boolean,              // Flag for admin users
  hospitalName: String,          // For admin users
  registrationDate: String       // User registration date
}
```

---

## Frontend Files

### 1. User Profile Page (`frontend/user deatils.html`)

**Features:**
- Profile picture with upload capability
- Personal information display (name, email, phone, location)
- Member since date
- Edit profile modal with form validation
- Recent appointments grid
- Statistics dashboard
- Quick navigation buttons

**Key Sections:**
```
┌─────────────────────────────────────┐
│          Navigation Bar              │
│  • Book Appointment                  │
│  • My Appointments                   │
│  • Logout                            │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│        Profile Header                │
│  • Profile Image (150x150)           │
│  • Upload Button                     │
│  • Name & Email                      │
│  • Detail Cards (Phone, Location)    │
│  • Edit Profile Button               │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Statistics Section              │
│  • Total Appointments                │
│  • Confirmed                         │
│  • Completed                         │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│    Recent Appointments               │
│  (Grid of appointment cards)         │
└─────────────────────────────────────┘
```

**API Endpoints Used:**
- `GET /api/auth/profile` - Fetch user profile
- `GET /api/appointments/my` - Get user appointments
- `PUT /api/auth/update-profile` - Update profile information
- `POST /api/auth/update-profile` - Upload profile image

### 2. Admin Profile Page (`frontend/admin-profile.html`)

**Features:**
- Admin badge indicating hospital role
- Hospital information display
- Appointment statistics (total, confirmed, emergency)
- Emergency appointment tracking
- Admin profile management
- Hospital emergency indicator on appointments

**Key Sections:**
```
┌─────────────────────────────────────┐
│          Navigation Bar              │
│  • Create Slots                      │
│  • All Appointments                  │
│  • Logout                            │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│       Admin Header                   │
│  • Admin Badge                       │
│  • Profile Image                     │
│  • Admin Name & Email                │
│  • Hospital Name                     │
│  • Phone & Registered Date           │
│  • Edit Profile Button               │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     Hospital Statistics              │
│  • Total Slots                       │
│  • Total Appointments                │
│  • Emergency Bookings                │
│  • Confirmed Appointments            │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Recent Appointments                │
│  (Last 6 appointments with status)   │
│  • Emergency badge for critical      │
│  • Appointment details               │
└─────────────────────────────────────┘
```

**API Endpoints Used:**
- `GET /api/auth/profile` - Fetch admin profile
- `GET /api/appointments/all` - Get all appointments
- `PUT /api/auth/update-profile` - Update admin profile

---

## Login Redirection

### User Login Flow
```
User Login Page
    │
    ├─ Enter credentials
    │
    ├─ POST /api/auth/login
    │
    ├─ Token received ✓
    │
    └─ Redirect to: user deatils.html (Profile Page)
```

### Admin Login Flow
```
Hospital Login Page
    │
    ├─ Enter credentials
    │
    ├─ POST /api/auth/login
    │
    ├─ Token received ✓
    │
    └─ Redirect to: admin-profile.html (Admin Profile)
```

---

## Image Upload System

### Profile Image Upload Process
```javascript
// 1. User selects image file
File Selection
    │
    ▼
// 2. Convert to Base64
FileReader.readAsDataURL()
    │
    ▼
// 3. Send to backend
PUT /api/auth/update-profile
    { profileImage: "data:image/png;base64,..." }
    │
    ▼
// 4. Display immediately
Update DOM with new image
    │
    ▼
Success Message
```

**Specifications:**
- Format: JPEG, PNG, GIF, WebP
- Max Size: Recommended 2MB (no enforced limit on frontend)
- Storage: Base64 encoded in MongoDB
- Display: 150x150px circular with gradient fallback

---

## Profile Information Fields

### User Profile Fields
| Field | Type | Required | Display |
|-------|------|----------|---------|
| username | String | ✓ | Profile Name |
| email | String | ✓ | Email Display |
| phoneNumber | String | ✓ | Contact Detail |
| location | String | ✓ | Location Detail |
| bio | String | ✗ | Optional Bio |
| profileImage | String | ✗ | Profile Avatar |
| registrationDate | String | ✓ | Member Since |

### Admin Profile Fields
| Field | Type | Required | Display |
|-------|------|----------|---------|
| username | String | ✓ | Admin Name |
| email | String | ✓ | Contact Email |
| phoneNumber | String | ✓ | Phone Display |
| hospitalName | String | ✓ | Hospital Name |
| profileImage | String | ✗ | Profile Avatar |
| registrationDate | String | ✓ | Member Since |

---

## Edit Profile Modal

### Structure
```
┌──────────────────────────────────┐
│ ✏️ Edit Profile      [✕]         │
├──────────────────────────────────┤
│                                  │
│  Full Name [________________]    │
│  Email     [________________]    │
│  Phone     [________________]    │
│  Location  [________________]    │
│  Bio       [________________]    │
│            [________________]    │
│                                  │
│  [💾 Save] [Cancel]              │
└──────────────────────────────────┘
```

### Validation
- All required fields must be filled
- Email format validation
- Phone number format validation
- Real-time error messages
- Success/error toast notifications

---

## Appointments Display

### User Appointments
**Card Layout:**
```
┌────────────────────────────────┐
│ Dr. Smith                      │
├────────────────────────────────┤
│ Hospital: City Hospital        │
│ Specialization: Cardiology     │
│ Date: 2025-12-28             │
│ Time: 09:00 - 10:00          │
│ Token: 1                       │
│ Status: [CONFIRMED]           │
└────────────────────────────────┘
```

### Admin Appointments
**Card Layout:**
```
┌────────────────────────────────┐
│ Dr. Smith [🚨 EMERGENCY]       │
├────────────────────────────────┤
│ Patient: John Doe              │
│ Contact: 9876543210           │
│ Date: 2025-12-28             │
│ Time: 09:00 - 10:00          │
│ Token: 1                       │
│ Status: [🚨 EMERGENCY]        │
└────────────────────────────────┘
```

---

## Statistics

### User Statistics
- **Total Appointments** - Count of all appointments
- **Confirmed** - Count of confirmed appointments
- **Completed** - Count of completed appointments

### Admin Statistics
- **Total Slots Created** - Count of all created slots
- **Total Appointments** - Count of all hospital appointments
- **Emergency Bookings** - Count of emergency appointments
- **Confirmed** - Count of confirmed appointments

---

## Styling & Theming

### Color Scheme
- **Primary:** #667eea (Purple Blue)
- **Secondary:** #764ba2 (Dark Purple)
- **Success:** #4CAF50 (Green)
- **Warning:** #FF9800 (Orange)
- **Emergency:** #ff6b6b (Red)
- **Background:** #f8f9ff (Light)

### Responsive Design
- Desktop: Full layout (> 768px)
- Tablet: Adjusted grid (< 768px)
- Mobile: Single column layout (< 480px)
- Flexible navigation bar
- Touch-friendly buttons and inputs

---

## Security Considerations

1. **JWT Authentication**
   - All endpoints require valid JWT token
   - Token validated before profile operations

2. **Image Upload**
   - Client-side file type validation
   - Base64 encoding prevents execution
   - File size recommendations enforced

3. **Profile Updates**
   - User can only update own profile
   - Admin can only update own hospital profile
   - Email uniqueness maintained

4. **Data Protection**
   - Sensitive data (password) never displayed
   - Profile image stored as Base64
   - All updates logged with timestamps

---

## JavaScript Functions

### Profile Loading
```javascript
// Load user profile from backend
async function loadUserProfile() {
  - Fetch user data from /api/auth/profile
  - Parse JWT if API fails
  - Display profile information
}

// Load admin profile from backend
async function loadAdminProfile() {
  - Fetch admin data from /api/auth/profile
  - Display admin and hospital info
  - Load appointment statistics
}
```

### Image Upload
```javascript
// Handle image file selection
async function handleImageUpload(event) {
  - Read file as Base64
  - Send to backend
  - Update display immediately
  - Show confirmation message
}

// Update profile image
async function updateProfileImage(base64Image) {
  - PUT request to /api/auth/update-profile
  - Update DOM with new image
  - Show success/error message
}
```

### Profile Edit
```javascript
// Open/close edit modal
function openEditModal()
function closeEditModal()

// Handle profile form submission
async function handleEditProfile(event) {
  - Validate form fields
  - PUT request to update endpoint
  - Refresh profile display
  - Show success/error message
  - Close modal
}
```

### Data Processing
```javascript
// Parse JWT token payload
function parseJWT(token)

// Format date for display
function formatDate(date)

// Get stored JWT token
function getToken()

// Handle logout
function logout()
```

---

## Messaging System

### Success Messages
- ✅ "Profile updated successfully!"
- ✅ "Profile picture updated successfully!"
- ✅ "Login successful! Redirecting..."

### Error Messages
- ❌ "Failed to update profile picture"
- ❌ "Error updating profile"
- ❌ "Authentication error: Please login again"
- ❌ "Failed to load appointments"

### Message Display
- Auto-dismiss after 3 seconds
- Color-coded (green=success, red=error)
- Positioned above content
- Non-blocking toast style

---

## Testing Scenarios

### Test Case 1: User Profile Load
```javascript
1. Login as user
2. Verify redirect to user deatils.html
3. Check profile information displayed
4. Verify appointment list loads
5. Verify statistics calculated correctly
```

### Test Case 2: Profile Image Upload
```javascript
1. Click upload icon
2. Select image file
3. Verify preview updates
4. Check Base64 conversion
5. Verify success message
```

### Test Case 3: Edit Profile
```javascript
1. Click "Edit Profile" button
2. Modal opens
3. Modify information
4. Click "Save Changes"
5. Verify profile updates
6. Check form pre-fills correctly
```

### Test Case 4: Admin Dashboard
```javascript
1. Login as admin
2. Verify redirect to admin-profile.html
3. Check hospital information
4. Verify appointment statistics
5. Check emergency badge on emergency appointments
```

---

## Troubleshooting

### Issue: Profile image not uploading
**Solution:** Check file size, format, and browser console for errors

### Issue: Profile data not loading
**Solution:** Verify JWT token is valid, check network tab for API calls

### Issue: Edit modal not closing
**Solution:** Clear browser cache, check console for JavaScript errors

### Issue: Appointments not displaying
**Solution:** Verify appointments exist in database, check API response format

---

## Future Enhancements

1. **Profile Customization**
   - Custom themes/color schemes
   - Display preference settings
   - Language/locale selection

2. **Advanced Statistics**
   - Appointment history graphs
   - Monthly appointment trends
   - Doctor ratings and reviews

3. **Notifications**
   - Appointment reminders
   - Status change alerts
   - Emergency appointment alerts

4. **Social Features**
   - Doctor review system
   - Hospital ratings
   - Recommendation sharing

5. **Export Features**
   - Download appointment history
   - Medical report export
   - Profile data backup

---

## File Structure

```
frontend/
├── user deatils.html          # User profile page
├── admin-profile.html         # Admin profile page
├── User login.html            # Updated with redirect
├── Hospital Login.html        # Updated with redirect
└── (other existing files)

backend/
├── models/
│   └── User.js                # Updated schema
├── routes/
│   └── auth.js                # Update endpoints
└── (other existing files)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-27 | Initial user and admin profile implementation |

---

## Support

For issues or questions about the profile feature:
1. Check this documentation
2. Review console errors (F12)
3. Verify JWT token validity
4. Check API responses in Network tab
5. Review server logs for backend errors

---

**Last Updated:** December 27, 2025  
**Status:** ✅ Production Ready  
**Maintainer:** NextIn Development Team

---
