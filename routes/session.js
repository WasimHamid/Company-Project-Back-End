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
router.post("/", async function(req, res, next) {
  // const {owner, ...rest} = req.body;
  const session = new Session(req.body);
  // const employee = await Employee.findOne({staffNumber: owner});
  // session.owner = employee._id;
  await session.save();
  res.json({ title: "Session" });
});

router.patch("/:id", async function(req, res, next) {
  const { id } = req.params;
  const {
    impact,
    potentialCategory,
    potential,
    overallImpact,
    overallPotentialCategory,
    overallPotential,
    successionPlan,
    managerComments
  } = req.body;
  const session = await Session.findOne({ _id: id });
  session.editHistory = [
    {
      impact: Array,
      potentialCategory: Array,
      potential: Array,
      overallImpact: Number,
      overallPotentialCategory: Number,
      overallPotential: Number,
      dateLastReviewed: Date,
      userCreatedSession: String,
      successionPlan: String,
      managerComments: String
    }
  ];
  if (impact) {
    session.impact = impact;
  }
  if (potentialCategory) {
    session.potentialCategory = potentialCategory;
  }
  if (potential) {
    session.potential = potential;
  }
  if (overallImpact) {
    session.overallImpact = overallImpact;
  }
  if (overallPotentialCategory) {
    session.overallPotentialCategory = overallPotentialCategory;
  }
  if (overallPotential) {
    session.overallPotential = overallPotential;
  }
  if (successionPlan) {
    session.successionPlan = successionPlan;
  }
  if (managerComments) {
    session.managerComments = managerComments;
  }

  await session.save();
});

module.exports = router;
