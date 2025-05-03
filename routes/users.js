var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

const uid2 = require("uid2");
const token = uid2(32);

const bcrypt = require("bcrypt");
const hash = bcrypt.hashSync("password", 10);

router.get("/", (req, res) => {
  User.find().then((data) => {
    res.json({ users: data });
  });
});

router.post("/signUp", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty field" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then((newDoc) => {
        res.json({ result: true, message: "new user created" });
      });
    } else {
      res.json({ result: false, error: "Already existing User" });
    }
  });
});
module.exports = router;
