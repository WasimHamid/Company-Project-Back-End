const express = require("express");
const Employee = require("../models/employees");
const Session = require("../models/sessions");
const router = express.Router();

router.get("/:staffNumber", async (req, res, next) => {
  try {
    const { staffNumber } = req.params;
    const { sessions } = req.query;

    let query = {
      staffNumber: staffNumber
    };

    const employee = await Employee.findOne(query);
    let payload = {
      employee
    };
    if (sessions) {
      payload = {
        ...payload,
        sessionsHistory: await Session.find({ owner: employee._id })
      };
    }
    res.json({ payload });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.get("/owner/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {
      _id: id
    };

    const employee = await Employee.findOne(query);
    let payload = {
      employee
    };
    res.json({ payload });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const sessions = req.query;
    const searchTerm = req.param("q") || null;

    let query = {};
    if (searchTerm !== null) {
      query = { $text: { $search: searchTerm } };
    }

    const employee = await Employee.find(query);
    let payload = {
      employee
    };
    if (sessions) {
      payload = {
        ...payload,
        sessionsHistory: await Session.find({ owner: employee._id })
      };
    }

    res.json({ payload });
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
