// Test Backend API
const API_BASE = 'http://localhost:5000';

async function testSignup() {
    console.log('Testing Signup API...');
    const testUser = {
        username: 'testuser_' + Date.now(),
        phoneNumber: '9876543210',
        email: `test${Date.now()}@example.com`,
        location: 'TestCity',
        password: 'test123'
    };

    try {
        const response = await fetch(`${API_BASE}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        
        const data = await response.json();
        console.log('Signup Response:', data);
        
        if (response.ok) {
            console.log('✅ Signup successful!');
            return testUser;
        } else {
            console.log('❌ Signup failed:', data.message);
            return null;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return null;
    }
}

async function testLogin(username, password) {
    console.log('\nTesting Login API...');
    
    try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        console.log('Login Response:', data);
        
        if (response.ok && data.token) {
            console.log('✅ Login successful! Token:', data.token.substring(0, 20) + '...');
            return data.token;
        } else {
            console.log('❌ Login failed:', data.message);
            return null;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return null;
    }
}

async function testCreateAppointment(token) {
    console.log('\nTesting Create Appointment API...');
    
    const appointment = {
        patientName: 'John Doe',
        contactNumber: '9876543210',
        date: '2025-12-28',
        location: 'Mumbai',
        organizationName: 'City Hospital',
        specialization: 'Cardiology',
        doctorName: 'Dr. Smith',
        timeSlot: '10:00-10:15 AM'
    };
    
    try {
        const response = await fetch(`${API_BASE}/api/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointment)
        });
        
        const data = await response.json();
        console.log('Appointment Response:', data);
        
        if (response.ok) {
            console.log('✅ Appointment created successfully!');
            return data;
        } else {
            console.log('❌ Appointment creation failed');
            return null;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return null;
    }
}

async function testGetMyAppointments(token) {
    console.log('\nTesting Get My Appointments API...');
    
    try {
        const response = await fetch(`${API_BASE}/api/appointments/my`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        console.log('My Appointments:', data);
        
        if (response.ok) {
            console.log(`✅ Found ${data.length} appointment(s)`);
            return data;
        } else {
            console.log('❌ Failed to fetch appointments');
            return null;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return null;
    }
}

async function runAllTests() {
    console.log('=================================');
    console.log('NextIn Backend API Tests');
    console.log('=================================\n');
    
    // Test 1: Signup
    const testUser = await testSignup();
    if (!testUser) {
        console.log('\n⚠️  Signup failed, stopping tests');
        return;
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 2: Login
    const token = await testLogin(testUser.username, testUser.password);
    if (!token) {
        console.log('\n⚠️  Login failed, stopping tests');
        return;
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 3: Create Appointment
    const appointment = await testCreateAppointment(token);
    if (!appointment) {
        console.log('\n⚠️  Appointment creation failed');
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 4: Get My Appointments
    await testGetMyAppointments(token);
    
    console.log('\n=================================');
    console.log('✅ All tests completed!');
    console.log('=================================');
}

// Run tests
runAllTests();
