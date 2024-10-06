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
        UserId:req.body.UserId,
        UserEmail:req.body.UserEmail,
        Password:req.body.Password
    }
    mongoClient.connect(conStr)
    .then(obj=>{
        var database = obj.db("react-js-tutorial-dashboard");
        database.collection("register_collection").insertOne(registerUserDetails)
        .then(()=>{
            console.log("Record Inserted");
            res.redirect("/login");
        })
    })
})




app.listen("5000");
console.log(`Server Started: http://127.0.0.1:5000`)