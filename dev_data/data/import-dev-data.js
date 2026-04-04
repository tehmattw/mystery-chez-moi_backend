const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Mystery = require("../../models/mysteryModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
  console.log("DB connection success");
});

//Read the mysteries-simple file
const mysteries = JSON.parse(
  fs.readFileSync(`${__dirname}/mysteries-simple.json`),
);

//Import data to db
const importData = async () => {
  try {
    await Mystery.create(mysteries);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from db
const deleteData = async () => {
  try {
    await Mystery.deleteMany();
    console.log("All data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
