const mongoose = require("mongoose")


const reqString = {
    type: String,
    required: true
}


const bookSchema = mongoose.Schema({
    books : [Object]
})

module.exports = mongoose.model('BookSchemas', bookSchema)