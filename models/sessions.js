const mongoose = require("mongoose");
const shortid = require("shortid");

const sessionsSchema = new mongoose.Schema(
  {
    sessionId: { type: String, default: shortid.generate },
    impact: Array,
    potentialCategory: Array,
    potential: Array,
    managers: Array,
    overallImpact: Number,
    overallPotentialCategory: Number,
    overallPotential: Number,
    dateLastReviewed: Date,
    editHistory: Array,
    userCreatedSession: String,
    successionPlan: String,
    managerComments: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
  },

  { timestamps: true }
);

const Session = mongoose.model("Session", sessionsSchema);

module.exports = Session;
