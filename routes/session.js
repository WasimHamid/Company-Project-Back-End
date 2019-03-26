var express = require("express");
const Session = require("../models/sessions");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ title: "Session" });
});

router.post("/", function(req, res, next) {
  const session = new Session(req.body);
  session.save();
  res.json({ title: "Session" });
});

module.exports = router;
