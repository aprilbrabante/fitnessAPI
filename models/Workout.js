/**********************
WORKOUT COLLECTION SCHEMA
***********************/
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["active", "completed", "pending"],
    default: "pending"
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // Must match your User model name
    required: true
  }
});

module.exports = mongoose.model("Workout", workoutSchema);