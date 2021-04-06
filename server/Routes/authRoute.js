const express = require("express");
const { check } = require("express-validator");
const {
  isAuthenticated,
  isUserExist,
  registerUser,
  logUser,
  showDashboard,
} = require("../Controllers/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to rolebase login 😃" });
});

router.post(
  "/register",
  [
    check("name", "name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check(
      "password",
      "password is required and should be atleast 4 char"
    ).isLength({ min: 4 }),
    check("role", "role is required").isString(),
  ],
  isUserExist,
  registerUser
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 4 }),
  ],
  logUser
);

router.get("/dashboard", isAuthenticated, showDashboard);

module.exports = router;
