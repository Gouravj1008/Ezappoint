import mongoose from "mongoose";
import dotenv from "dotenv";
import Slot from "./models/Slot.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import http from "http";

dotenv.config();

// Colors for output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m"
};

// Helper function to make HTTP requests
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            data: data ? JSON.parse(data) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

const log = {
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ️${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  step: (msg) => console.log(`${colors.cyan}➜${colors.reset} ${msg}`)
};

async function testBookingSystem() {
  try {
    log.step("═══════════════════════════════════════════════════");
    log.step("        APPOINTMENT BOOKING SYSTEM TEST");
    log.step("═══════════════════════════════════════════════════");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    log.success("Connected to MongoDB");

    // 1. Check existing slots
    log.step("\n1️⃣  Checking existing slots...");
    const existingSlots = await Slot.find({});
    log.info(`Found ${existingSlots.length} slots in database`);

    if (existingSlots.length > 0) {
      log.info("Sample slot:");
      console.log(JSON.stringify(existingSlots[0], null, 2));
    }

    // 2. Create test slots if none exist
    if (existingSlots.length === 0) {
      log.step("\n2️⃣  Creating test slots...");

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      const testSlots = [
        {
          hospitalName: "City General Hospital",
          doctorName: "Dr. Rajesh Kumar",
          specialization: "Cardiology",
          location: "New Delhi",
          date: tomorrowStr,
          timeSlot: "09:00 AM - 10:00 AM",
          totalSlots: 10,
          bookedSlots: 0,
          availableSlots: 10,
          isActive: true,
          isEmergencySlot: false
        },
        {
          hospitalName: "City General Hospital",
          doctorName: "Dr. Priya Singh",
          specialization: "Orthopedics",
          location: "New Delhi",
          date: tomorrowStr,
          timeSlot: "10:00 AM - 11:00 AM",
          totalSlots: 8,
          bookedSlots: 0,
          availableSlots: 8,
          isActive: true,
          isEmergencySlot: false
        },
        {
          hospitalName: "Apollo Hospital",
          doctorName: "Dr. Amit Patel",
          specialization: "Neurology",
          location: "Mumbai",
          date: tomorrowStr,
          timeSlot: "02:00 PM - 03:00 PM",
          totalSlots: 5,
          bookedSlots: 0,
          availableSlots: 5,
          isActive: true,
          isEmergencySlot: false
        },
        {
          hospitalName: "Fortis Hospital",
          doctorName: "Dr. Sarah Johnson",
          specialization: "Dermatology",
          location: "Bangalore",
          date: tomorrowStr,
          timeSlot: "11:00 AM - 12:00 PM",
          totalSlots: 12,
          bookedSlots: 0,
          availableSlots: 12,
          isActive: true,
          isEmergencySlot: false
        }
      ];

      const createdSlots = await Slot.insertMany(testSlots);
      log.success(`Created ${createdSlots.length} test slots`);
      log.info(`Slots are available for: ${tomorrowStr}`);
    }

    // 3. Test available-slots endpoint
    log.step("\n3️⃣  Testing /api/organization/available-slots endpoint...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const slotsResponse = await fetch(
      `http://localhost:5000/api/organization/available-slots?date=${tomorrowStr}&location=Delhi`,
      {
        method: "GET"
      }
    );

    const slotsData = await slotsResponse.json();
    log.info(`Response Status: ${slotsResponse.status}`);
    log.info(`Found ${slotsData.count} available slots`);
    if (slotsData.slots && slotsData.slots.length > 0) {
      log.success("Sample slot returned:");
      console.log(JSON.stringify(slotsData.slots[0], null, 2));
    }

    // 4. Create test user for booking
    log.step("\n4️⃣  Creating test user for booking...");

    let testUser = await User.findOne({ email: "testuser@example.com" });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      testUser = await User.create({
        username: "testuser",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "patient"
      });
      log.success(`Created test user: ${testUser.email}`);
    } else {
      log.info(`Test user already exists: ${testUser.email}`);
    }

    // 5. Test authentication
    log.step("\n5️⃣  Testing authentication...");

    const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "testuser@example.com",
        password: "password123"
      })
    });

    const loginData = await loginResponse.json();
    if (loginResponse.ok) {
      log.success("Login successful");
      const token = loginData.token;
      log.info(`JWT Token (first 20 chars): ${token.substring(0, 20)}...`);

      // 6. Test appointment booking
      log.step("\n6️⃣  Testing appointment booking...");

      const slots = await Slot.find({ isActive: true, availableSlots: { $gt: 0 } });
      if (slots.length > 0) {
        const selectedSlot = slots[0];
        log.info(`Using slot: ${selectedSlot.doctorName} - ${selectedSlot.timeSlot}`);

        const bookingResponse = await fetch(
          "http://localhost:5000/api/appointments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              slotId: selectedSlot._id.toString(),
              patientName: "John Doe",
              contactNumber: "9876543210",
              isEmergency: false,
              emergencyReason: ""
            })
          }
        );

        const bookingData = await bookingResponse.json();
        if (bookingResponse.ok) {
          log.success("Appointment booked successfully!");
          log.info(`Token Number: ${bookingData.tokenNumber}`);
          log.info(`Status: ${bookingData.message}`);
          console.log("\nFull Response:");
          console.log(JSON.stringify(bookingData, null, 2));
        } else {
          log.error(`Booking failed: ${bookingData.message}`);
          console.log(JSON.stringify(bookingData, null, 2));
        }
      } else {
        log.warn("No available slots found for booking test");
      }
    } else {
      log.error(`Login failed: ${loginData.message}`);
    }

    log.step("\n═══════════════════════════════════════════════════");
    log.success("TEST COMPLETED");
    log.step("═══════════════════════════════════════════════════");

    process.exit(0);
  } catch (error) {
    log.error(`Test failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run tests
testBookingSystem();
