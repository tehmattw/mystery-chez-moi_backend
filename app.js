const express = require("express");
const morgan = require("morgan");

const mysteryRouter = require("./routes/mysteryRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.set("query parser", "extended");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/mysteries", mysteryRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
