const mongoose = require("mongoose")


const reqString = {
    type: String,
    required: true
}


const bookSchema = mongoose.Schema({
    id: Number,
    name: String,
    amount: Number
})

module.exports = mongoose.model('BookSchemas', bookSchema)