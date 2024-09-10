if (process.env.ENVTYPE !== "prod") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { initializeDbConnection, db } = require("./config/server");
const app = express();
initializeDbConnection();
const userRoutes = require("./routes/user.routes");
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use("/users", userRoutes);

module.exports = app;
