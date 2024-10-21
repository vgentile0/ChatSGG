const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    statusFriend: {
        type: Number,
        enums: [
            0,  //inviata
            1,  //accettata
            2   //rifiutata
        ]
    }
});

module.exports = mongoose.model("Friendship", friendSchema);



