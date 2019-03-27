var express = require("express");
const Session = require("../models/sessions");
const Employee = require("../models/employees");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ title: "Session" });
});

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
