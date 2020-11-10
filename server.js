let express = require('express');
let path = require('path');
let app = express();
let mongoose = require('mongoose')
let login = require('./configfile')
let mongoPath = `mongodb+srv://Vic:${login}@cluster0.q16eb.mongodb.net/appdata`
let bookSchema = require('./schemas/BookSchema')

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

const Schema = mongoose.Schema;
const TestSchema = new Schema ({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})

const TestPost = mongoose.model("TestPost", TestSchema)
const dummyData = {
    title: "Testing",
    body: "Just checking mongoose"
}

const newTestPost = new TestPost(dummyData)

// newTestPost.save((err)=>{
//     if(err)
//         console.log("Error, something happened")
//     else
//         console.log("Data has been posted")
// })

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/build', express.static(path.join(__dirname, 'build')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.get("/api", function (req, res) {
    TestPost.find({ })
        .then((dummyData)=>{
            console.log("Data", dummyData)
            res.json(data)
        })
        .catch((error)=>{
            console.log("Error", error)
        });
});


app.use(
    "/",
    (req, res) => {
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



// app.post("/api/add", bodyParser.json(), function(req, res) {
//
// });
