const express = require("express");

const router = express.Router();


router.use("/auth", express.json(), require("./auth"));
router.use("/", express.json(), require("./files") );




module.exports = router;
