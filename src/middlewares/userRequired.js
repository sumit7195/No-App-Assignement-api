require("dotenv").config();

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  let token = req.headers.auth;

  userModel.findByToken(token, (err, user) => {
    if (err) throw Error("You are not logged in");
    if (!user)
      return res.status(400).json({
        isAuth: false,
        message: "Please logged in first",
      });

    req.token = token;
    req.user = user;
    next();
  });
};
