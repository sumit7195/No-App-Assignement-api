const mongoose = require("mongoose");

const csvFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  linkedin: {
    type: String,
    required: true,
  },
  profile_url:{
      type:String,
      required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const csvFileModel = mongoose.model("CsvFile", csvFileSchema);

module.exports = csvFileModel;
