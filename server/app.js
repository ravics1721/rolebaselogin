require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const authRoutes = require("./Routes/authRoute");

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/roleBaseDB";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("DB Connected");
  });

app.use("/api", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to role base auth 😎 make all request at *** /api *** prefix ",
    register: {
      uri: "/register",
      method: "POST",
      body: "['name','email', 'password', 'role']",
      response: "Register user response",
    },
    login: {
      uri: "/login",
      method: "POST",
      body: "['email', 'password']",
      response: "Logged user details",
    },
    dashboard: {
      uri: "/dashboard",
      method: "GET",
      response: "Get the dashboard response according to role of the user",
    },
  });
});

app.listen(PORT, () => {
  console.log(`App is running on: ${PORT}`);
});
