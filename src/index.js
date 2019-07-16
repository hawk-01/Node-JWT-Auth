const express = require("express");
const app = express();
const auth = require("./Routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To My Auth API");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

app.use("/api/auth", auth);

app.listen(8080);
