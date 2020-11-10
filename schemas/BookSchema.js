const mongoose = require("mongoose")


const bookSchema = mongoose.Schema({
    name: String,
    amount: Number,
    id: Number
})

module.exports = mongoose.model('bookSchemas', bookSchema)