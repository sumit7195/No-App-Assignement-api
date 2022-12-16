const express = require("express");

const router = express.Router();

const userRequired = require("../middlewares/userRequired");

router.use("/auth", express.json(), require("./auth"));

module.exports = router;
