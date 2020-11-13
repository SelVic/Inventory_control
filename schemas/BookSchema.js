const mongoose = require("mongoose")



const bookSchema = mongoose.Schema({
    name: String,
    amount: Number,
    description: String,
    date: String
})

module.exports = mongoose.model('itemSchemas', bookSchema)