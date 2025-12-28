import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import appointmentRoutes from "./routes/appointments.js";
import organizationRoutes from "./routes/organization.js";


dotenv.config();

const app = express();

// Prevent server from exiting
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/organization", organizationRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "NextIn API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const server = app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
      console.log(`📝 API endpoints available:`);
      console.log(`   - POST /api/auth/signup`);
      console.log(`   - POST /api/auth/login`);
      console.log(`   - POST /api/appointments`);
      console.log(`   - GET  /api/appointments/my`);
      console.log(`   - GET  /api/appointments/all`);
      console.log(`\n🔌 Backend ready for connections!`);
    });
    
    // Keep server alive
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000;
    
    // Handle server errors
    server.on('error', (err) => {
      console.error("❌ Server error:", err);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
