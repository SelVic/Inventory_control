const mongoose = require("mongoose")



const bookSchema = mongoose.Schema({
    name: String,
    amount: Number,
    id: Number,
    date: String
})

module.exports = mongoose.model('bookSchemas', bookSchema)