const { AuthController } = require("../controllers/authController");
const userRequired = require("../middlewares/userRequired");

const express = require("express");

const router = express.Router();

//this is for creating routers
router.post("/register", AuthController.register);

// this is for login routes

router.post("/login", AuthController.login);

// this is for getting user proile

router.get("/profile", userRequired, AuthController.profile);

// this is for logout 

router.get("/logout", userRequired, AuthController.logout);


module.exports = router;
