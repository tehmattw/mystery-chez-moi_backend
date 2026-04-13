const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const mysteryRouter = require("./routes/mysteryRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.set("query parser", "extended");
app.set("etag", false);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.options("/{*any}", cors());
//no-store for tokens + testing dev
app.use("/api/v1", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

app.use("/api/v1/mysteries", mysteryRouter);
app.use("/api/v1/users", userRouter);

app.all("/{*any}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
