const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const login = require('./configfile')
const mongoPath = `mongodb+srv://Vic:${login}@cluster0.q16eb.mongodb.net/appdata`
const bookSchema = require('./schemas/BookSchema')

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
    bookSchema.find({ })
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

app.use("/", (req, res) => {
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



