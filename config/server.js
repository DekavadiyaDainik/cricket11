const mongoose = require("mongoose");

const initializeDbConnection = () => {
  if (process.env.ENVTYPE !== "prod") {
    return mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Success connection to DB");
      })
      .catch((err) => console.log("Mongo error, ", err));
  } else {
    return mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: false,
      })
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => console.log("Mongo error", err));
  }
};

const db = mongoose.connection;

module.exports = { initializeDbConnection, db };
