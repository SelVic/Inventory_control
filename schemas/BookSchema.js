const mongoose = require("mongoose")


const reqString = {
    type: String,
    required: true
}


const bookSchema = mongoose.Schema({
    // id: Number,
    //     // name : reqString,
    //     // amount : Number
    books : [Object]
})

module.exports = mongoose.model('BookSchemas', bookSchema)