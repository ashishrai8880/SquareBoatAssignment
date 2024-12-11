const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect("mongodb://127.0.0.1/squareboat")
    .then(() => {
      console.log("db is connected");
    })
    .catch((err) => {
      console.log("failed to connect");
    });
}

module.exports = { connectToDB };
