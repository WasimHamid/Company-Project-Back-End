const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema(
  {
    staffNumber: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    department: String,
    manager: String,
    accessLevel: Number,
    dateLastReviewed: Date,
    previousImpactScores: Array,
    previousPotentialCategoryScores: Array,
    previousPotentialScore: Array
  },

  { timestamps: true }
);
employeesSchema.index({ "$**": "text" });
module.exports = mongoose.model("Employee", employeesSchema);
