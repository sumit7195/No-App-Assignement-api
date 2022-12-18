const UserModel = require("../models/userModel");

module.exports.AuthController = {
  async register(req, res) {
    // taking a user
    const newuser = new UserModel(req.body);

    UserModel.findOne({ email: newuser.email }, function (err, user) {
      if (user)
        return res.status(400).json({ auth: false, message: "email exits" });

      newuser.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ success: false });
        }

        delete doc.password;

        res.status(200).json({
          succes: true,
          user: doc,
        });
      });
    });
  },

  async login(req, res) {
    let token = req.cookies.auth;

    // check user already exists

    UserModel.findByToken(token, function (err, user) {
      if (err) return res(err);

      if (user)
        return res.status(400).json({
          error: true,
          message: "You are already logged in",
        });
      else {
        UserModel.findOne({ email: req.body.email }, function (err, user) {
          if (!user)
            return res.status(400).json({
              isAuth: false,
              message: "You are not registered",
            });

          user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
              return res.status(400).json({
                isAuth: false,
                message: "Passowrd is not correct!",
              });

            user.generateToken((err, user) => {
              if (err) return res.status(400).send(err);

              res.cookie("auth", user.token).json({
                isAuth: true,
                id: user._id,
                email: user.email,
                token: user.token,
              });
            });
          });
        });
      }
    });
  },
  // get logged in userProfile

  async profile(req, res) {
    res.json({
      name: req.user.name,
      email: req.user.email,
    });
  },

  async logout(req, res) {
    req.user.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err);
      res.sendStatus(200);
    });
  },
};
