const mongoose = require("mongoose")


const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const bookSchema = mongoose.Schema({
    id: reqNumber,
    name : reqString,
    amount : reqNumber
})

module.exports = mongoose.model('BookSchemas', bookSchema)