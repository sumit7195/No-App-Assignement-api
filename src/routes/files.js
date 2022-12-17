const userRequired = require("../middlewares/userRequired");
const express = require("express");

const csvFileController = require("../controllers/csvFileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const userRequired = require("../middlewares/userRequired");

const router = express.Router();

// getting files
router.get("/files", userRequired, csvFileController.getFiles);

// uploading files

router.post(
  "/upload",
  userRequired,
  upload.single("avatar"),

  csvFileController.Upload
);

// delete one file

router.delete("/delete/:id", userRequired, csvFileController.deleteOne);

module.exports = router;
