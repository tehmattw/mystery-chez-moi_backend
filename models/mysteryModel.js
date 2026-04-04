const mongoose = require("mongoose");

const mysterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A mystery must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A mystery must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A mystery must have a max group size"],
  },
  difficulty: {
    type: String,
    trim: true,
    required: [true, "A mystery must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A mystery must have a price"],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A mystery must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  images: {
    type: [String],
  },
  startDates: {
    type: [Date],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Mystery = mongoose.model("Mystery", mysterySchema);

module.exports = Mystery;
