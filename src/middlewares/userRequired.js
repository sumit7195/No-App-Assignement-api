require("dotenv").config();

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  let token = req.cookies.auth;
  userModel.findByToken(token, (err, user) => {
    if (err) throw Error("You are not logged in");
    if (!user)
      return res.json({
        isAuth: false,
        message: "Please logged in first",
      });

    req.token = token;
    req.user = user;
    next();
  });
};
