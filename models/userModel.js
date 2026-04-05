const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    trim: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  //not sure why next wont work as a function -> will next() work? To test
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  const User = mongoose.model("User", userSchema);
  this.passwordConfirm = undefined;
  next;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
