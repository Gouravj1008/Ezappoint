// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:5000',
    ENDPOINTS: {
        // Auth endpoints
        SIGNUP: '/api/auth/signup',
        LOGIN: '/api/auth/login',
        
        // Appointment endpoints
        CREATE_APPOINTMENT: '/api/appointments',
        MY_APPOINTMENTS: '/api/appointments/my',
        ALL_APPOINTMENTS: '/api/appointments/all'
    }
};

// Helper to get full URL
function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + endpoint;
}

// Helper to get auth headers
function getAuthHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
}
