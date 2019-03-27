const express = require("express");
const Employee = require("../models/employees");

const router = express.Router();
router.get("/:staffNumber", async (req, res, next) => {
  try {
    const staffNumber = req.param("staffNumber") || null;

    let query = {
      staffNumber: staffNumber
    };

    const employees = await Employee.findOne(query);
    res.json({ payload: { employee: employees } });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const searchTerm = req.param("q") || null;

    let query = {};
    if (searchTerm !== null) {
      query = { $text: { $search: searchTerm } };
    }

    const employees = await Employee.find(query);

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
