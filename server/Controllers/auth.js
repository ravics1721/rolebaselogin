const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user");

//Register Controller
const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  //add new user
  const body = req.body;
  const newUser = new User(body);
  await newUser.save((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ err: err.message, message: "Unable to save user" });
    user.password = undefined;
    res.json({
      message: "User Registration success",
      user: user,
    });
  });
};

//Login Controller
const logUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //login user
  const { email, password } = req.body;
  await User.findOne({ email }, async (err, user) => {
    if (err || !user)
      return res.status(404).json({ err: err, message: "user not found" });
    try {
      //validate user password
      const validate = await user.isValidPassword(password);
      if (!validate)
        return res.status(400).json({ message: "incorrect password" });
      //generate auth token
      const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET, {
        expiresIn: "1h",
      });
      user.password = undefined;
      return res.json({ token: token, user: user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `some err ${e.message}` });
    }
  });
};
/**
 *
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @param {} next - next task
 */
const isUserExist = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }, function (err, user) {
    if (user) return res.status(400).json({ message: "user alredy exist" });
    next();
  });
};

// Authentication middlwware

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(404).json({ error: "Invalid token" });
  jwt.verify(token, process.env.LOGIN_SECRET, function (err, decoded) {
    if (err) return res.json({ err: err.message });
    req.userid = decoded._id;
    next();
  });
};

const showDashboard = (req, res) => {
  try {
    User.findById(req.userid).exec((err, user) => {
      if (err) return res.status(400).json({ error: err.message });
      if (user.role === "user") {
        user.password = undefined;
        return res.status(200).json({
          message: "Welcome to the user dashboard",
          user: user,
        });
      }
      if (user.role === "admin") {
        user.password = undefined;
        return res.status(200).json({
          message: "Welcome to the Admin dashboard",
          user: user,
        });
      }
    });
  } catch (arr) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  logUser,
  isAuthenticated,
  showDashboard,
  isUserExist,
};
