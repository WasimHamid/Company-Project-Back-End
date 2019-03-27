var mongoose = require('mongoose')

const graphSchema = new mongoose.Schema({
    ImpactScore: { type: Number, require: true},
    PotentialCategory:{type: Number, require: true},
    PotenitalScore:{ type: Number, require: true},
    // energisers: [mongood.Scheme.Types.ObjectId] user has energiser
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" } /// linking to the User collection. refer to an owner in Routes


},
    { timestamps: true }
);




module.exports = mongoose.model("Graph", graphSchema);