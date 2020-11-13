const mongoose = require("mongoose")



const bookSchema = mongoose.Schema({
    name: String,
    description: String,
    totalAmount: Number,
    date: String
})

module.exports = mongoose.model('itemSchemas', bookSchema)