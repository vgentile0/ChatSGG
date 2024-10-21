const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    cognome: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 15,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    }
});

module.exports = mongoose.model("User", userSchema);