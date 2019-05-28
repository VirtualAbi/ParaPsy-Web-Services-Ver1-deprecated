const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

// ORM Connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

//Body Parser
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", require("./routes/users"));

port = process.env.PORT || 3000;

app.listen(port, console.log(`Listening on port ${port}`));
