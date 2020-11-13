const mongoose = require("mongoose")

const historySchema = mongoose.Schema({
    added: Number,
    deleted: Number,
    date: String
})

module.exports = mongoose.model('history', historySchema)