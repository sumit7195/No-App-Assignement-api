const csvtojson = require("csvtojson");

const csvFileModel = require("../models/csvFilesModel");

module.exports.getFiles = async (req, res) => {
  try {
    const files = await csvFileModel.find({ userId: req.user._id });

    return res.status(200).json({
      status: true,
      data: files,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ status: false, data: err });
  }
};

module.exports.Upload = async function (req, res) {
  try {
    csvtojson()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        var files = [];

        for (let i = 0; i < jsonObj.length; i++) {
          let obj = {};

          obj.name = jsonObj[i].name;
          obj.phone = jsonObj[i].phone;
          obj.email = jsonObj[i].email;
          obj.linkedin = jsonObj[i].linkedin;
          obj.userId = req.user._id;
          obj.profile_url = jsonObj[i].profileUrl;

          files.push(obj);
        }

        csvFileModel
          .insertMany(files)
          .then(function (data) {
            // console.log("data", data);

            return res.status(201).json({
              status: "success",
              data,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "failure",
              err,
            });
          });
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteOne = async function (req, res) {
  let id = req.params.id;

//   console.log("req params", id);

  try {
    let makeDeleteRequest = await csvFileModel.deleteOne({ _id: id });

    return res.status(200).json({
      status: true,
      data: "deleted",
    });
  } catch (err) {
    console.log(err);

    return res.status(400).send(err);
  }
};
