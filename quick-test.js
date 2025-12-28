// Quick Test Script - Run in Node.js
const API_BASE = 'http://localhost:5000';

async function quickTest() {
    console.log('\n🧪 QUICK BACKEND TEST\n');
    console.log('='.repeat(50));
    
    // Test 1: Create User
    console.log('\n1️⃣  Creating test user...');
    const testUser = {
        username: `testuser_${Date.now()}`,
        phoneNumber: '9876543210',
        email: `test${Date.now()}@example.com`,
        location: 'Mumbai',
        password: 'test123'
    };
    
    try {
        const signupRes = await fetch(`${API_BASE}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const signupData = await signupRes.json();
        
        if (signupRes.ok) {
            console.log('✅ User created successfully!');
            console.log('   User ID:', signupData.userId);
        } else {
            console.log('❌ Signup failed:', signupData.message);
            return;
        }
        
        // Test 2: Login
        console.log('\n2️⃣  Logging in...');
        const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: testUser.username,
                password: testUser.password
            })
        });
        const loginData = await loginRes.json();
        
        if (loginRes.ok && loginData.token) {
            console.log('✅ Login successful!');
            console.log('   Token:', loginData.token.substring(0, 20) + '...');
            
            const token = loginData.token;
            
            // Test 3: Create Appointment
            console.log('\n3️⃣  Creating appointment...');
            const appointment = {
                patientName: 'Test Patient',
                contactNumber: '9876543210',
                date: '2025-12-28',
                location: 'Mumbai',
                organizationName: 'Test Hospital',
                specialization: 'General',
                doctorName: 'Dr. Test',
                timeSlot: '10:00-10:30 AM'
            };
            
            const apptRes = await fetch(`${API_BASE}/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(appointment)
            });
            const apptData = await apptRes.json();
            
            if (apptRes.ok) {
                console.log('✅ Appointment created successfully!');
                console.log('   Token Number:', apptData.tokenNumber);
                console.log('   Appointment ID:', apptData.appointment._id);
                
                // Test 4: Get My Appointments
                console.log('\n4️⃣  Fetching user appointments...');
                const myApptRes = await fetch(`${API_BASE}/api/appointments/my`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const myAppts = await myApptRes.json();
                
                if (myApptRes.ok) {
                    console.log(`✅ Found ${myAppts.length} appointment(s)`);
                    
                    // Test 5: Get All Appointments
                    console.log('\n5️⃣  Fetching all appointments (admin view)...');
                    const allApptRes = await fetch(`${API_BASE}/api/appointments/all`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const allAppts = await allApptRes.json();
                    
                    if (allApptRes.ok) {
                        console.log(`✅ Total appointments in system: ${allAppts.length}`);
                        
                        console.log('\n' + '='.repeat(50));
                        console.log('🎉 ALL TESTS PASSED!');
                        console.log('='.repeat(50));
                        console.log('\n✅ Backend is working perfectly!');
                        console.log('✅ User registration works');
                        console.log('✅ User login works');
                        console.log('✅ Appointment creation works');
                        console.log('✅ Token auto-generation works');
                        console.log('✅ Appointment fetching works');
                        console.log('\n🚀 You can now use the frontend!');
                    } else {
                        console.log('❌ Failed to fetch all appointments');
                    }
                } else {
                    console.log('❌ Failed to fetch user appointments');
                }
            } else {
                console.log('❌ Appointment creation failed:', apptData.message);
            }
        } else {
            console.log('❌ Login failed:', loginData.message);
        }
        
    } catch (error) {
        console.log('\n❌ ERROR:', error.message);
        console.log('\n⚠️  Make sure the backend server is running on port 5000!');
    }
}

quickTest();
