const mongoose = require("mongoose");

const mysterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A mystery must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A mystery must have a price"],
  },
});

const Mystery = mongoose.model("Mystery", mysterySchema);

module.exports = Mystery;
