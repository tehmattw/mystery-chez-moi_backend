const mongoose = require("mongoose");

const app = require("../app");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const DB = process.env.DATABASE.replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD,
  );

  await mongoose.connect(DB);
  isConnected = true;
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
