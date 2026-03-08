const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: String,
    college: String,
    year: String,

    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    { timestamps: true });

module.exports = mongoose.model("Batch", batchSchema);