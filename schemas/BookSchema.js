const mongoose = require("mongoose")

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


const bookSchema = mongoose.Schema({
    name: String,
    amount: Number,
    id: Number,
    date: today
})

module.exports = mongoose.model('bookSchemas', bookSchema)