const mongoose = require("mongoose")

const historySchema = mongoose.Schema({
    name: String,
    action: String,
    amount: Number,
    date: String
})

module.exports = mongoose.model('history', historySchema)