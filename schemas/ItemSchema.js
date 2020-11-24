const mongoose = require("mongoose")



const itemSchema = mongoose.Schema({
    name: String,
    description: String,
    totalAmount: Number,
    date: String
})

module.exports = mongoose.model('itemSchemas', itemSchema)