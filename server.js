const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const login = require('./configfile')
const mongoPath = `mongodb+srv://Vic:${login}@cluster0.q16eb.mongodb.net/appdata`
const bookSchema = require('./schemas/BookSchema')
const historySchema = require("./schemas/HistorySchema")

async function mong() {
    try{
        await mongoose.connect(mongoPath,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connected to Mongodb")
    }catch(e) {
        console.log(e)
    }
}

mong()


app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/build', express.static(path.join(__dirname, 'build')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/api", function (req, res) {
    bookSchema.find({ })
        .then((apiData)=>{
            res.json(apiData)
        })
        .catch((error)=>{
            console.log("Error", error)
        });
});

app.get("/api/history", function (req, res) {
    historySchema.find({ })
        .then((apiData)=>{
            res.json(apiData)
        })
        .catch((error)=>{
            console.log("Error", error)
        });
});

app.post("/savedb", function(req, res){
    console.log("Body:", req.body)
    const reqData = req.body;

    const newBookSchema = new bookSchema(reqData)

    newBookSchema.save((error)=>{
        if (error) {
            res.status(500).json({msg: "Sorry, internal server errors"})
        } else{
            res.json({
                msg: "Data received"
            })
        }
    })
})

app.post("/deleteHistory", async function(req,res){
    const reqData = req.body;
    const matchingItem = await bookSchema.findOne({_id : reqData.itemId})

    let matchingItemAmount = await parseInt(matchingItem.totalAmount, 10)
    await historySchema.findByIdAndDelete(reqData.historyId, (err) => {
        if (err) {
            res.status(500).json({msg: "Sorry, internal server errors"})
        } else{
            res.json({
                msg: "Data received"
            })
        }
    })
    if(reqData.action == "Added"){
        let newTotalAmount = matchingItemAmount - parseInt(reqData.amount, 10)
        await bookSchema.findOneAndUpdate({_id : reqData.itemId}, {totalAmount : newTotalAmount})
    }
    else{
        let newTotalAmount = matchingItemAmount + parseInt(reqData.amount, 10)
        await bookSchema.findOneAndUpdate({_id : reqData.itemId}, {totalAmount : newTotalAmount})
    }

})




app.post("/savedb/history", async function(req, res){
    console.log("HistoryBody:", req.body)
    const reqData = req.body;
    const reqDataId = req.body.uniqueId;
    const matchingItem = await bookSchema.findOne({_id : reqDataId})
    let matchingItemAmount = await parseInt(matchingItem.totalAmount, 10)

    if(reqData.action == "Added"){
        let newTotalAmount = matchingItemAmount + parseInt(reqData.amount, 10)
        await bookSchema.findOneAndUpdate({_id : reqDataId}, {totalAmount : newTotalAmount})
    }
    else{
        let newTotalAmount = matchingItemAmount - parseInt(reqData.amount, 10)
        await bookSchema.findOneAndUpdate({_id : reqDataId}, {totalAmount : newTotalAmount})
    }


    const newHistorySchema = new historySchema(reqData)

    newHistorySchema.save((error)=>{
        if (error) {
            res.status(500).json({msg: "Sorry, internal server errors"})
        } else{
            res.json({
                msg: "Data received"
            })
        }
    })
})

app.use("/", function (req, res) {
        res.sendFile("index.html", { root: __dirname });
    }
);

app.get('*', function (req, res, next) {
    console.log(`404 ${req.url}`)
    return res.sendStatus(404);
})

app.use(function(err, req, res, next){
    console.log("Ошибка", err)
    return res.sendStatus(503);
})


app.listen(3000);
console.log('http://localhost:3000');


// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.get('/error', function (req, res, next) {
//     next('404040')
// })


// const getData = async () => {
//     const res = await fetch('localhost:3000/api/get')
//     if(res.status == 200) {
//         const { data } = await res.json()
//         setItems(data.items) // положить в стэйт
//     }
// }



