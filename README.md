# 🏥 NextIn - Full Stack Appointment Booking System

Welcome to **NextIn**, a comprehensive appointment booking platform featuring complete end-to-end flow with **automatic token generation** for every appointment booking! 🎟️

## ⚡ Quick Start (30 Seconds)

**Option 1: Fully Automated Demo**
```
1. Open: frontend/auto-booking-demo.html
2. Click: "▶️ Start Complete Demo"
3. Wait: ~5 seconds
4. See: ✅ Token number generated (e.g., 439011)
5. Done! 🎉
```

**Option 2: Step-by-Step Manual**
```
1. Open: frontend/complete-booking-demo.html
2. Register → Create Slots → Search → Book → See Token
3. Follow the 5-step interactive flow
```

## ✨ Key Features

- **✅ Token Generation** 🎟️ - Unique tokens auto-generated on every booking
- **✅ User Profiles** - User registration and login with JWT
- **✅ Admin Tools** - Hospital slot creation and management
- **✅ Appointment Booking** - Complete booking flow with validation
- **✅ Emergency Booking** - Fast-track with priority handling
- **✅ Slot Search** - Advanced filtering by date, location, specialization
- **✅ Secure Authentication** - JWT-based session management
- **✅ Responsive Design** - Works on desktop, tablet, and mobile
- **✅ Complete Documentation** - Multiple guides and API references

## Tech Stack

### Backend
- **Node.js v22** + Express v5
- **MongoDB** + Mongoose v9
- **JWT v9** Authentication
- **bcrypt v6** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients
- **Vanilla JavaScript ES6+** - Dynamic functionality
- **Fetch API** - Backend communication
- **LocalStorage** - Token persistence

## Project Structure

```
nextin-fullstack/
├── backend/
│   ├── server.js           # Main server file
│   ├── .env                # Environment variables
│   ├── package.json        # Dependencies
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Appointment.js  # Appointment schema
│   └── routes/
│       ├── auth.js         # Authentication routes
│       ├── appointments.js # Appointment routes
│       └── organization.js # Organization routes
└── frontend/
    ├── index.html          # Landing page
    ├── User sign up.html   # User registration
    ├── User login.html     # User login
    ├── Book Appointment.html    # Appointment booking
    ├── view appointments.html   # View all appointments
    └── config.js           # API configuration
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Modern web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   The `.env` file is already configured with:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/nextin
   JWT_SECRET=supersecretkey
   ```

4. **Start MongoDB:**
   - Windows: Open MongoDB Compass or run `mongod` in terminal
   - Make sure MongoDB is running on port 27017

5. **Start the backend server:**
   ```bash
   node server.js
   ```
   Or use the batch file:
   ```bash
   start-server.bat
   ```

   Server will run at: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open with a local server:**
   - Using VS Code: Install "Live Server" extension and click "Go Live"
   - Using Python: `python -m http.server 8000`
   - Using Node: `npx http-server -p 8000`

3. **Access the application:**
   - Open `http://localhost:8000` (or your server port)
   - Or directly open `index.html` in a browser

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
  - Body: `{ username, phoneNumber, email, location, password }`
  
- `POST /api/auth/login` - User login
  - Body: `{ username, password }`
  - Returns: `{ token }`

### Appointments (Protected Routes)
- `POST /api/appointments` - Create appointment
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ patientName, contactNumber, date, location, organizationName, specialization, doctorName, timeSlot }`

- `GET /api/appointments/my` - Get user's appointments
  - Headers: `Authorization: Bearer <token>`

- `GET /api/appointments/all` - Get all appointments (admin)
  - Headers: `Authorization: Bearer <token>`

## Features

### User Features
- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Book appointments with doctors
- ✅ View personal appointments
- ✅ Form validations (phone, email, dates)

### Admin/Hospital Features
- ✅ View all appointments
- ✅ Paginated appointment list
- ✅ Filter and search capabilities

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected routes with middleware
- ✅ CORS enabled for cross-origin requests

## Usage Flow

1. **User Registration:**
   - Navigate to "User sign up" from homepage
   - Fill in registration form
   - Submit to create account

2. **User Login:**
   - Navigate to "User login"
   - Enter credentials
   - JWT token stored in localStorage

3. **Book Appointment:**
   - After login, user is redirected to booking page
   - Fill in appointment details
   - Submit to create appointment
   - Receive token number confirmation

4. **View Appointments:**
   - Hospital admin can view all appointments
   - Users can view their own appointments
   - Paginated list with 10 items per page

## Troubleshooting

### Backend Issues
- **Server won't start:** Check if MongoDB is running
- **Connection error:** Verify MongoDB URI in `.env`
- **Port conflict:** Change PORT in `.env` file

### Frontend Issues
- **Can't connect to backend:** Ensure backend is running on port 5000
- **Login fails:** Check browser console for errors
- **CORS errors:** Verify CORS is enabled in backend

### Common Fixes
- Clear browser localStorage: `localStorage.clear()`
- Restart MongoDB service
- Check Node.js version: `node --version`
- Reinstall dependencies: `npm install`

## Development Notes

- Frontend uses localStorage to persist JWT tokens
- Token expires after 7 days (configurable in auth.js)
- Passwords must be at least 6 characters
- Phone numbers validated to 10 digits
- Minimum appointment date is tomorrow

## License

ISC

## Support

For issues or questions, please check the console logs in both browser and server terminal.
