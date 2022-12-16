require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing the passowrd

userSchema.pre("save", function (next) {
  var user = this;
  let salt = 10;

  if (this.isModified("password")) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  } else {
    next();
  }
});




// find by token

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
  
    jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
      user.findOne({ _id: decode, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  };
  






// compare passoword
userSchema.methods.comparePassword = function (password, cb) {
//   console.log("password", password);

  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

// generate token

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};


// delete token

userSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.update({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
