var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");

router.get("/", (req, res) => {
  User.find().then((data) => {
    res.json({ users: data });
  });
});

module.exports = router;
