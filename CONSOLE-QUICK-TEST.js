// Quick Start Testing Guide
// Copy and paste into browser console on test pages

// ==========================================
// 1. CHECK BACKEND STATUS
// ==========================================
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend Status:', d))
  .catch(e => console.error('❌ Backend Error:', e));

// ==========================================
// 2. SEARCH FOR AVAILABLE SLOTS
// ==========================================
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dateStr = tomorrow.toISOString().split('T')[0];

fetch(`http://localhost:5000/api/organization/available-slots?date=${dateStr}&location=Delhi`)
  .then(r => r.json())
  .then(d => {
    console.log(`✅ Found ${d.count} slots:`, d.slots);
    window.slotId = d.slots[0]?._id;
  })
  .catch(e => console.error('❌ Slot Error:', e));

// ==========================================
// 3. REGISTER NEW USER
// ==========================================
const timestamp = Date.now();
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: `user${timestamp}`,
    email: `user${timestamp}@test.com`,
    password: 'Test@12345'
  })
})
.then(r => r.json())
.then(d => console.log('✅ User registered:', d))
.catch(e => console.error('❌ Signup Error:', e));

// ==========================================
// 4. LOGIN USER
// ==========================================
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'testuser@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(d => {
  console.log('✅ Login successful');
  window.token = d.token;
  console.log('Token saved to window.token');
})
.catch(e => console.error('❌ Login Error:', e));

// ==========================================
// 5. BOOK APPOINTMENT (requires window.token and window.slotId)
// ==========================================
if (!window.token) {
  console.error('❌ No token! Login first.');
} else if (!window.slotId) {
  console.error('❌ No slotId! Search slots first.');
} else {
  fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.token}`
    },
    body: JSON.stringify({
      slotId: window.slotId,
      patientName: 'Test Patient',
      contactNumber: '9876543210',
      isEmergency: false
    })
  })
  .then(r => r.json())
  .then(d => {
    console.log('✅ Appointment booked!');
    console.log('Token Number:', d.tokenNumber);
    console.log('Full Response:', d);
  })
  .catch(e => console.error('❌ Booking Error:', e));
}

// ==========================================
// 6. VIEW MY APPOINTMENTS
// ==========================================
if (!window.token) {
  console.error('❌ No token! Login first.');
} else {
  fetch('http://localhost:5000/api/appointments/my', {
    headers: {
      'Authorization': `Bearer ${window.token}`
    }
  })
  .then(r => r.json())
  .then(d => {
    console.log(`✅ Found ${d.length} appointments:`, d);
  })
  .catch(e => console.error('❌ Error:', e));
}

// ==========================================
// DEBUGGING TIPS
// ==========================================
// Check what's in window:
console.log('Current window.token:', window.token);
console.log('Current window.slotId:', window.slotId);

// Check localStorage (for JWT):
console.log('LocalStorage jwtToken:', localStorage.getItem('jwtToken'));

// View all API responses nicely:
console.table(yourArrayData);
