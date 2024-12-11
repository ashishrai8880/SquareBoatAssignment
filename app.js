const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { connectToDB } = require("./db");
const api = require("./routes/api");

connectToDB();

dotenv.config();

app.use(express.json());
app.use("/api", api);

app.listen(3000, () => {
  console.log("App is listening to port : 3000");
});
