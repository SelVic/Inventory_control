const mongoose = require("mongoose")

const historySchema = mongoose.Schema({
    uniqueId: String,
    action: String,
    amount: Number,
    customer: String,
    date: String
})

module.exports = mongoose.model('history', historySchema)