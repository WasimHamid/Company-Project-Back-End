const express = require("express");
const Employee = require("../models/employees");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json({ payload: { employees } });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.get("/:empId", async function(req, res, next) {
  try {
    const employees = await Employee.find({ staffNumber: empId });
    res.json({ payload: { employees } });
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
    const employees = new Employee(req.body);
    await employees.save();
    res.status(201).json({ payload: { employees } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error creating employees", error: err });
  }
});

module.exports = router;
