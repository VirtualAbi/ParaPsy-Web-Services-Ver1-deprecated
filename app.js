const express = require("express");
const mongoose = require("mongoose");

const app = express();

port = process.env.PORT || 3000;

app.listen(port, console.log(`Listening on port ${port}`));
