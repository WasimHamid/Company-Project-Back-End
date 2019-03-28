const mongoose = require("mongoose");
const shortid = require("shortid");
// const Schema = mongoose.Schema;

const sessionsSchema = new mongoose.Schema(
  {
    sessionId: { type: String, default: shortid.generate },
    firstName: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    lastName: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    staffNumber: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
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

// const employeesSchema = new mongoose.Schema(
//   {
//     staffNumber: { type: String, required: true, unique: true },
//     firstName: String,
//     lastName: String,
//     email: String,
//     department: String,
//     manager: String,
//     accessLevel: Number,
//     dateLastReviewed: Date,
//     previousImpactScores: Array,
//     previousPotentialCategoryScores: Array,
//     previousPotentialScore: Array
//   },

//   { timestamps: true }
// );

const Session = mongoose.model("Session", sessionsSchema);
// const Employee = mongoose.model("Employee", employeesSchema);

sessionsSchema.index({ "$**": "text" });
// employeesSchema.index({ "$**": "text" });

module.exports = Session;
// module.exports = Employee;
