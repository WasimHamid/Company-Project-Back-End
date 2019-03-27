const express = require("express");
const User = require("../models/graph");
const router = express.Router();

router.post("/", function (req, res, next) {
    const user = new Graph(req.body);
    // let owner = Users.findOne({ username: owner })
    user
        .save()
        .then(() => {
            res.json({
                success: true,
                message: `Created ${user.firstName} as a user`
            });
        })
        .catch(err => console.error(err));
});

module.exports = router;
