const mongoose = require("mongoose");

const sessionsSchema = new mongoose.Schema(
  {
    staffNumber: { type: String, required: true, unique: true },
    firstname: String,
    lastname: String,
    department: String,
    manager: String,
    scores: Array,
    potentialCategory: String,
    potential: String,
    impact: Number,
    potentialCategory: Number,
    potential: Number,
    previousImpactScores: Array,
    previousPotentialCategoryScores: Array,
    previousPotentialScore: Array,
    dateLastReviewed: Date,
    editHistory: { type: String, type: Date },
    userCreatedSession: String,
    successionPlan: String,
    managerComments: String
  },

  { timestamps: true }
);

const Session = mongoose.model("sessions", sessionsSchema);

module.exports = Session;
