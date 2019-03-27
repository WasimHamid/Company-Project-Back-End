const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const { comparePassword } = require("../utils");

const router = express.Router();

router.post("/", async function(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "authentication failed, no user found"
      });
    }
    const match = await comparePassword(req.body.password, user.password);
    if (match) {
      const { email, firstName, lastName } = user;
      const data = {
        email,
        firstName,
        lastName
      };
      const token = jwt.sign(
        {
          data
        },
        "secret token"
      );
      return res.json({
        success: true,
        message: "authentication successfull",
        token
      });
    }
    return res.status(401).json({
      success: false,
      message: "login unsuccessfull, passwords do not match"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error logging in"
    });
  }
});

module.exports = router;
