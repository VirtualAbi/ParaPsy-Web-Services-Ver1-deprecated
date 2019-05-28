const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const config = require("config");

const app = express();

//DB Config
const db = config.get("mongoURI");

// ORM Connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//Body Parser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", require("./routes/users"));

port = process.env.PORT || 3000;

app.listen(port, console.log(`Listening on port ${port}`));
