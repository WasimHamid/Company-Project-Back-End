var express = require("express");
const Session = require("../models/sessions");
const Employee = require("../models/employees");

var router = express.Router();

router.get("/:sessionId", async (req, res, next) => {
  try {
    const sessionId = req.param("sessionId") || null;

    let query = {
      sessionId: sessionId
    };

    const sessions = await Session.findOne(query); //.populate("owner");
    res.json({ payload: { session: sessions } });
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

    const sessions = await Session.find(query);

    res.json({ payload: { sessions } });
  } catch (err) {
    res.status(500).json({
      message: "error finding in the database",
      error: err
    });
  }
});

router.post("/", function(req, res, next) {
  const session = new Session(req.body);
  session.save();
  res.json({ title: "Session" });
});

// router.post("/", async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const session = new Session(req.body);
//     await session.save();
//     res.status(201).json({ payload: { session } });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "error creating employees", error: err });
//   }
// router.post("/", async function (req, res, next) {
//   // const {owner, ...rest} = req.body;
//   const session = new Session(req.body);
//   // const employee = await Employee.findOne({staffNumber: owner});
//   // session.owner = employee._id;
//   await session.save();
//   res.json({ title: "Session" });
// });

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
