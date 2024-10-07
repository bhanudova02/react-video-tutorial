var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;
var conStr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/login", (req, res) => {
    mongoClient.connect(conStr)
        .then(obj => {
            var database = obj.db("react-js-tutorial-dashboard");
            database.collection("register_collection").find({}).toArray().then(document => {
                res.send(document);
                res.end();
            });
        })
        .catch(err => {
            console.log(err)
        })
});


app.post("/register", (req, res) => {
    const registerUserDetails = {
        UserId: req.body.UserId,
        UserEmail: req.body.UserEmail,
        Password: req.body.Password
    }
    mongoClient.connect(conStr)
        .then(obj => {
            var database = obj.db("react-js-tutorial-dashboard");
            database.collection("register_collection").insertOne(registerUserDetails)
                .then(() => {
                    console.log("Record Inserted");
                    res.redirect("/login");
                })
        })
});

app.get("/videos", (req, res) => {
    mongoClient.connect(conStr).then((clientObj) => {
        var database = clientObj.db("react-js-tutorial-dashboard");
        database.collection("video_library").find({}).toArray().then((documents) => {
            res.send(documents)
        })
    })
});

app.post("/add_video", (req, res) => {
    var video = {
        "title": req.body.title,
        "url": req.body.url,
        "views": parseInt(req.body.views),
        "likes": parseInt(req.body.likes),
        "subscribed": (req.body.subscribed == "true") ? true : false
    }
    mongoClient.connect(conStr).then(clientObj => {
        var database = clientObj.db("react-js-tutorial-dashboard");
        database.collection("video_library").insertOne(video).then((result) => {
            console.log("Video Inserted");
            res.redirect("/videos");
        })
    })
})




app.listen("5000");
console.log(`Server Started: http://127.0.0.1:5000`)