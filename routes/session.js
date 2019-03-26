var express = require("express");
const Session = require("../models/sessions");

var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const session = await Session.find({});
    res.json({ payload: { session } });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const session = new Session(req.body);
    await session.save();
    res.status(201).json({ payload: { session } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error creating employees", error: err });
  }
});

module.exports = router;
