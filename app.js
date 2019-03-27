const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const sessionRouter = require("./routes/session");
const employeeRouter = require("./routes/employees");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://appservice:tH15isPA55@cluster0-fhx89.mongodb.net/Project-Vulcan?retryWrites=true",
  { useNewUrlParser: true }
);

var app = express();

// This middleware is to solve the CORS issues
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const authenticate = (req, res, next) => {
  const token = req.query.token;
  console.log("token", token);
  if (token) {
    return jwt.verify(token, "secret token", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "failed to authenticate token"
        });
      }
      req.decoded = decoded;
      console.table(decoded);
      next();
    });
  }
  return res.status(401).json({
    success: false,
    message: "No token provided"
  });
};

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRouter);
app.use("/sessions", authenticate, sessionRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/employees", employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err });
});

module.exports = app;
