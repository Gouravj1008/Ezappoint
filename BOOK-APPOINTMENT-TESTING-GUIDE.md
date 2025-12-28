# 📋 Book Appointment Page - Real-Time Testing Guide

## 🎯 Testing Overview

This document provides comprehensive testing instructions for the **Book Appointment** page, including all possible scenarios, edge cases, and expected behaviors.

---

## 🚀 Quick Start

### Prerequisites
1. ✅ Backend server running on `http://localhost:5000`
2. ✅ MongoDB connected and running
3. ✅ Test user account created (username: `testuser`, password: `test123`)
4. ✅ Available appointment slots created

### Access Test Suite
Open: `book-appointment-test.html` in your browser

This test suite provides:
- **Live server status monitoring**
- **Automated test scenarios**
- **Real-time results logging**
- **Success/failure statistics**
- **Live preview of booking page**

---

## 🧪 Test Scenarios

### 1. Authentication Tests

#### Test 1.1: Booking Without Login Token
**Purpose:** Verify that unauthenticated users cannot access slots

**Steps:**
1. Clear localStorage (remove jwtToken)
2. Try to search for available slots
3. Try to book an appointment

**Expected Result:**
- ❌ Request should be rejected with 401 Unauthorized
- ❌ User should be redirected to login page
- ✅ Error message: "No login token found"

**Pass Criteria:** System prevents unauthorized access

---

#### Test 1.2: Booking With Invalid Token
**Purpose:** Verify token validation works correctly

**Steps:**
1. Set an invalid token in localStorage
2. Try to access available slots
3. Attempt to book appointment

**Expected Result:**
- ❌ Request rejected with 401/403 status
- ✅ Token validation working correctly
- ✅ Error message displayed

**Pass Criteria:** Invalid tokens are rejected

---

### 2. Form Validation Tests

#### Test 2.1: Empty Patient Name
**Purpose:** Ensure patient name is required

**Steps:**
1. Login successfully
2. Search for slots
3. Leave patient name field empty
4. Enter contact number
5. Select a slot
6. Click "Book Appointment"

**Expected Result:**
- ❌ Form submission blocked
- ✅ Error message: "Please enter patient name and contact number"
- ✅ Focus remains on form

**Pass Criteria:** Empty name field prevents booking

---

#### Test 2.2: Invalid Phone Number
**Purpose:** Validate phone number format

**Test Cases:**
| Input | Length | Expected Result |
|-------|--------|-----------------|
| "123" | 3 | ❌ Invalid (too short) |
| "12345" | 5 | ❌ Invalid (too short) |
| "98765432101" | 11 | ❌ Invalid (too long) |
| "9876543210" | 10 | ✅ Valid |
| "abc123" | N/A | ❌ Only numbers allowed |

**Expected Behavior:**
- Input field only accepts numeric characters
- Max length is 10 digits
- Validation on blur or submit
- Error message for invalid length

**Pass Criteria:** Only 10-digit numbers accepted

---

#### Test 2.3: Special Characters in Name
**Purpose:** Ensure name field only accepts letters

**Test Cases:**
| Input | Expected Result |
|-------|-----------------|
| "John123" | "John" (numbers removed) |
| "John@Doe" | "JohnDoe" (special chars removed) |
| "John Doe" | "John Doe" (spaces allowed) |
| "John-Doe" | "JohnDoe" (hyphens removed) |

**Expected Behavior:**
- Real-time filtering of non-letter characters
- Spaces preserved for multi-word names
- No special characters allowed

**Pass Criteria:** Only alphabetic characters and spaces accepted

---

### 3. Slot Search Tests

#### Test 3.1: Search With All Filters
**Purpose:** Test comprehensive slot search

**Steps:**
1. Login as user
2. Select tomorrow's date
3. Enter location: "Mumbai"
4. Enter specialization: "Cardiology"
5. Click "Search Available Slots"

**Expected Result:**
- ✅ Loading message: "Searching for available slots..."
- ✅ API call to `/api/organization/available-slots`
- ✅ Results displayed in dropdown
- ✅ Success message with count

**Pass Criteria:** Slots filtered correctly by all criteria

---

#### Test 3.2: Search With No Results
**Purpose:** Handle empty search results gracefully

**Steps:**
1. Login successfully
2. Select future date (e.g., 2026-12-31)
3. Enter non-existent location
4. Click search

**Expected Result:**
- ⚠️ Message: "No available slots found for the selected criteria"
- ✅ Slot section hidden
- ✅ Submit button hidden
- ✅ No error thrown

**Pass Criteria:** Empty state handled properly

---

#### Test 3.3: Search Without Date
**Purpose:** Ensure date is required

**Steps:**
1. Leave date field empty
2. Enter location
3. Click search

**Expected Result:**
- ❌ Error message: "Please select date and location to search slots"
- ❌ No API call made
- ✅ Form validation prevents submission

**Pass Criteria:** Date validation works

---

#### Test 3.4: Search Without Location
**Purpose:** Ensure location is required

**Steps:**
1. Select date
2. Leave location empty
3. Click search

**Expected Result:**
- ❌ Error message shown
- ❌ Search blocked
- ✅ Validation message displayed

**Pass Criteria:** Location validation works

---

#### Test 3.5: Search With Specialization Filter
**Purpose:** Test specialization filtering

**Steps:**
1. Select date and location
2. Enter specialization: "Cardiology"
3. Search slots

**Expected Result:**
- ✅ Only Cardiology slots returned
- ✅ Other specializations filtered out
- ✅ Count matches filtered results

**Pass Criteria:** Specialization filter works correctly

---

### 4. Slot Selection Tests

#### Test 4.1: Select Slot from Dropdown
**Purpose:** Verify slot selection displays details

**Steps:**
1. Search for available slots
2. Open slot dropdown
3. Select a slot

**Expected Result:**
- ✅ Slot details section appears
- ✅ Shows: Hospital, Doctor, Specialization, Time, Available Slots
- ✅ "Book Appointment" button appears
- ✅ Details match selected slot

**Pass Criteria:** Slot details displayed accurately

---

#### Test 4.2: Change Slot Selection
**Purpose:** Test switching between slots

**Steps:**
1. Select first slot
2. Note details displayed
3. Select different slot
4. Verify details update

**Expected Result:**
- ✅ Details update immediately
- ✅ Previous selection replaced
- ✅ Book button remains visible
- ✅ Correct slot data displayed

**Pass Criteria:** Slot switching works smoothly

---

#### Test 4.3: No Slot Selected Booking
**Purpose:** Prevent booking without slot selection

**Steps:**
1. Search for slots
2. Fill patient name and contact
3. Don't select any slot
4. Click "Book Appointment"

**Expected Result:**
- ❌ Error: "Please select a slot before booking"
- ❌ Booking prevented
- ✅ User prompted to select slot

**Pass Criteria:** Booking blocked without slot selection

---

### 5. Normal Booking Tests

#### Test 5.1: Complete Valid Booking
**Purpose:** Test full booking flow

**Steps:**
1. Login as testuser
2. Search for tomorrow's slots in Mumbai
3. Select available slot
4. Enter patient name: "Test Patient"
5. Enter contact: "9876543210"
6. Click "Book Appointment"

**Expected Result:**
- ✅ API call to POST /api/appointments
- ✅ Success response with token number
- ✅ Confirmation page displayed
- ✅ Shows: Token number, patient details, doctor info, hospital, date, time
- ✅ "Home" and "View My Appointments" buttons available

**Response Data:**
```json
{
  "message": "Appointment booked successfully",
  "tokenNumber": 1,
  "remainingSlots": 9,
  "appointment": { /* appointment object */ }
}
```

**Pass Criteria:** Booking successful with all details displayed

---

#### Test 5.2: Book Multiple Appointments
**Purpose:** Test consecutive bookings

**Steps:**
1. Complete one booking successfully
2. Return to booking page
3. Book another appointment (same or different slot)
4. Verify both bookings

**Expected Result:**
- ✅ Both bookings successful
- ✅ Token numbers increment correctly
- ✅ Available slots decrease
- ✅ No conflicts or errors

**Pass Criteria:** Multiple bookings handled correctly

---

#### Test 5.3: Book Last Available Slot
**Purpose:** Test booking when only 1 slot remains

**Steps:**
1. Search for slot with 1 available
2. Book the slot
3. Verify slot becomes unavailable

**Expected Result:**
- ✅ Booking successful
- ✅ Remaining slots = 0
- ✅ Slot no longer appears in search
- ⚠️ Message: "No slots available" on next search

**Pass Criteria:** Last slot booking handled correctly

---

### 6. Emergency Booking Tests

#### Test 6.1: Emergency Booking Activation
**Purpose:** Test emergency mode toggle

**Steps:**
1. Click "🚨 Emergency Booking" button
2. Observe UI changes

**Expected Result:**
- ✅ Emergency section expands
- ✅ Button text changes to "✅ Emergency Mode Active"
- ✅ Emergency info displayed
- ✅ Reason textarea appears
- ✅ Priority badge shown

**Pass Criteria:** Emergency mode activates correctly

---

#### Test 6.2: Complete Emergency Booking
**Purpose:** Test full emergency booking flow

**Steps:**
1. Activate emergency mode
2. Search for slots
3. Select slot
4. Fill patient details
5. Enter emergency reason: "Severe chest pain and difficulty breathing"
6. Click "Book Appointment"

**Expected Result:**
- ✅ API call with `isEmergency: true`
- ✅ Emergency reason sent in request
- 🚨 Confirmation page shows emergency badge
- ✅ Status: "EMERGENCY - PRIORITY BOOKING"
- ✅ Token marked as emergency

**Request Data:**
```json
{
  "slotId": "...",
  "patientName": "Emergency Patient",
  "contactNumber": "9999999999",
  "isEmergency": true,
  "emergencyReason": "Severe chest pain and difficulty breathing"
}
```

**Pass Criteria:** Emergency booking processed with priority

---

#### Test 6.3: Emergency Without Reason
**Purpose:** Ensure emergency reason is required

**Steps:**
1. Activate emergency mode
2. Select slot and fill details
3. Leave emergency reason empty
4. Try to book

**Expected Result:**
- ❌ Error: "Please provide a reason for emergency booking"
- ❌ Booking prevented
- ✅ Validation working

**Pass Criteria:** Emergency reason required

---

#### Test 6.4: Toggle Emergency Mode Off
**Purpose:** Test deactivating emergency mode

**Steps:**
1. Activate emergency mode
2. Fill emergency reason
3. Click emergency button again

**Expected Result:**
- ✅ Emergency section collapses
- ✅ Button text resets
- ✅ Emergency reason cleared
- ✅ Normal booking mode restored

**Pass Criteria:** Emergency toggle works both ways

---

### 7. Date and Time Tests

#### Test 7.1: Past Date Selection
**Purpose:** Prevent selecting past dates

**Steps:**
1. Try to select yesterday's date
2. Try to select today's date

**Expected Result:**
- ❌ Past dates disabled (HTML5 min attribute)
- ❌ Today disabled (min = tomorrow)
- ✅ Only future dates selectable

**Pass Criteria:** Date picker prevents past/today selection

---

#### Test 7.2: Tomorrow's Date Booking
**Purpose:** Test booking for next day

**Steps:**
1. Select tomorrow's date
2. Complete booking

**Expected Result:**
- ✅ Tomorrow's date accepted
- ✅ Booking successful
- ✅ Date displayed correctly in confirmation

**Pass Criteria:** Next-day booking works

---

#### Test 7.3: Far Future Date
**Purpose:** Test booking far in advance

**Steps:**
1. Select date 3 months ahead
2. Search for slots
3. Complete booking

**Expected Result:**
- ✅ Date accepted
- ⚠️ May have no slots available (acceptable)
- ✅ System handles gracefully

**Pass Criteria:** Future dates handled correctly

---

### 8. Slot Capacity Tests

#### Test 8.1: Full Slot Booking Attempt
**Purpose:** Prevent overbooking

**Steps:**
1. Find slot with 0 available slots
2. Try to book it

**Expected Result:**
- ❌ Slot not shown in dropdown
- ❌ Booking prevented
- ✅ Error if attempted via API

**Pass Criteria:** Full slots cannot be booked

---

#### Test 8.2: Concurrent Booking Race Condition
**Purpose:** Test simultaneous bookings

**Steps:**
1. Open 2 browser windows
2. Both select same slot (1 remaining)
3. Both try to book simultaneously

**Expected Result:**
- ✅ One booking succeeds
- ❌ Other fails with "Slot full" error
- ✅ No overbooking occurs

**Pass Criteria:** Race condition handled properly

---

### 9. Auto-Refresh Tests

#### Test 9.1: Slot Auto-Refresh
**Purpose:** Test 10-second slot refresh

**Steps:**
1. Search for slots
2. Keep slot section open
3. Wait 10 seconds
4. Observe refresh

**Expected Result:**
- ✅ Slots refreshed every 10 seconds
- ✅ Available count updates
- ✅ New slots appear if added
- ✅ Full slots disappear

**Pass Criteria:** Auto-refresh updates slot availability

---

### 10. Error Handling Tests

#### Test 10.1: Network Error
**Purpose:** Handle server disconnection

**Steps:**
1. Stop backend server
2. Try to search slots
3. Try to book appointment

**Expected Result:**
- ❌ Error message: "An error occurred while searching for slots"
- ✅ User-friendly error display
- ✅ No crash or freeze

**Pass Criteria:** Network errors handled gracefully

---

#### Test 10.2: API Error Response
**Purpose:** Handle backend errors

**Steps:**
1. Send invalid slot ID
2. Send malformed data

**Expected Result:**
- ❌ Error message from API displayed
- ✅ Specific error shown to user
- ✅ Form remains usable

**Pass Criteria:** API errors displayed properly

---

### 11. UI/UX Tests

#### Test 11.1: Loading States
**Purpose:** Verify loading indicators

**Steps:**
1. Click "Search Available Slots"
2. Observe loading message

**Expected Result:**
- ✅ "Searching for available slots..." message
- ✅ Button disabled during search (optional)
- ✅ Clear feedback to user

**Pass Criteria:** Loading states visible

---

#### Test 11.2: Success Messages
**Purpose:** Verify success feedback

**Steps:**
1. Complete successful booking
2. Check confirmation page

**Expected Result:**
- ✅ Clear success indicator
- ✅ All booking details displayed
- ✅ Call-to-action buttons visible

**Pass Criteria:** Success clearly communicated

---

#### Test 11.3: Responsive Design
**Purpose:** Test on different screen sizes

**Steps:**
1. Open on desktop (>1024px)
2. Resize to tablet (768px-1024px)
3. Resize to mobile (<768px)

**Expected Result:**
- ✅ Layout adapts smoothly
- ✅ All elements accessible
- ✅ No horizontal scroll
- ✅ Touch-friendly on mobile

**Pass Criteria:** Responsive on all devices

---

## 📊 Test Results Tracking

### Test Execution Log

| Test ID | Test Name | Expected | Actual | Status | Notes |
|---------|-----------|----------|--------|--------|-------|
| 1.1 | No Token | Reject 401 | | ⏳ | |
| 1.2 | Invalid Token | Reject 401 | | ⏳ | |
| 2.1 | Empty Name | Block | | ⏳ | |
| 2.2 | Invalid Phone | Block | | ⏳ | |
| 3.1 | Search All | Results | | ⏳ | |
| 3.2 | No Results | Empty | | ⏳ | |
| 5.1 | Valid Booking | Success | | ⏳ | |
| 6.2 | Emergency | Priority | | ⏳ | |

---

## 🎯 Success Criteria

### Critical Tests (Must Pass)
- ✅ Authentication validation
- ✅ Valid booking completion
- ✅ Emergency booking with priority
- ✅ Phone number validation
- ✅ Slot selection required
- ✅ Date validation

### Important Tests (Should Pass)
- ✅ Empty field validation
- ✅ No results handling
- ✅ Error message display
- ✅ Auto-refresh functionality
- ✅ Slot capacity enforcement

### Nice to Have (Good to Pass)
- ✅ Responsive design
- ✅ Loading indicators
- ✅ Race condition handling

---

## 🚀 Automated Test Suite Usage

### Running All Tests
1. Open `book-appointment-test.html`
2. Click "🚀 Run All Tests Sequentially"
3. Observe results in real-time
4. Check statistics panel

### Running Individual Tests
- Click any specific test button
- View results in log panel
- Check pass/fail status

### Test Statistics
- **Total Tests:** Count of executed tests
- **Passed:** Successfully completed tests
- **Failed:** Tests that didn't meet criteria
- **Success Rate:** Percentage of passing tests

---

## 🐛 Known Issues & Workarounds

### Issue 1: Auto-refresh clears selection
**Workaround:** Complete booking before 10-second refresh

### Issue 2: Multiple rapid bookings
**Workaround:** Add debounce to book button

### Issue 3: Token expiration during booking
**Workaround:** Implement token refresh or extend expiry

---

## 📝 Test Data Requirements

### User Accounts
- **Test User:** testuser / test123
- **Test Admin:** adminuser / admin123

### Appointment Slots
- **Location:** Mumbai
- **Date:** Tomorrow's date
- **Doctor:** Dr. Smith (Cardiology)
- **Slots:** Minimum 5 available

### Emergency Test Cases
- Severe symptoms requiring immediate attention
- Valid reasons with detailed description

---

## ✅ Final Checklist

Before marking testing complete:

- [ ] All authentication tests passed
- [ ] Form validation working correctly
- [ ] Slot search returns accurate results
- [ ] Normal booking flow successful
- [ ] Emergency booking with priority
- [ ] Error handling graceful
- [ ] UI responsive on all devices
- [ ] Loading states visible
- [ ] Success messages clear
- [ ] Auto-refresh working

---

## 📞 Support

For issues during testing:
1. Check browser console (F12)
2. Verify backend server running
3. Check MongoDB connection
4. Review server logs
5. Ensure test data exists

---

**Last Updated:** December 27, 2025  
**Test Suite Version:** 1.0  
**Status:** ✅ Ready for Testing

---
