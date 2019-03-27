const mongoose = require("mongoose");
const shortid = require("shortid");

const sessionsSchema = new mongoose.Schema(
  {
    sessionId: { type: String, default: shortid.generate },
<<<<<<< HEAD
=======
var sessionId = require("short-id");
sessionId.configure({
  length: 5,
  algorithm: "sha1",
  salt: Math.random
});

const sessionsSchema = new mongoose.Schema(
  {
    sessionId: sessionId.generate(),
>>>>>>> 085797ef668264574c678d1b992a136a74c3b7bf
    impact: Array,
    potentialCategory: Array,
    potential: Array,
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
