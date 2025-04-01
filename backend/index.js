import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4001;

const corsOptions = {
  origin: true,
  credentials: true,
};

// Connect to MongoDB
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

// MongoDB Event Listeners
mongoose.connection.on("connected", () => console.log(" MongoDB connected"));
mongoose.connection.on("error", (err) => console.error(" MongoDB error:", err));
mongoose.connection.on("disconnected", () => console.log(" MongoDB disconnected"));

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Start Server
app.listen(port, () => {
  connectDB();
  console.log(` Server listening on port ${port}`);
});
