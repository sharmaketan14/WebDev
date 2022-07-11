const exp = require('constants');
const express = require('express');
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const { json } = require('express/lib/response');
const app = express();

app.set('views',path.join("/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/FrontEnd/TicTacToe/HTML"))
app.set('view engine','ejs')

app.use(express.static("/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/FrontEnd/TicTacToe/CSS"));
app.use(express.static("/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/FrontEnd/TicTacToe/JS"))
app.use(express.urlencoded({extended:false}));

function scores_json(){
    const filePath = path.join(__dirname, "WebDevelopmentUdemy","FrontEnd","DATA","scores.json");
    return filePath;
}

function rem(){
    let filePath = scores_json();
    let fileData = fs.readFileSync(filePath);
    const existing_scores = [];
    fs.writeFileSync(filePath,existing_scores);
}

app.get("/", function(req, res){
    res.render("TicTacToe");
})

app.get("/scores",function(req,res){
    let filePath = scores_json();
    let fileData = fs.readFileSync(filePath);
    const existing_scores = JSON.parse(fileData);
    res.render("scores", {names:existing_scores, len:Object.keys(existing_scores).length});
})

app.post("/result",function(req,res){
    req.body.matchid = uuid.v4();
    let comp = req.body;
    let filePath = scores_json();
    let fileData = fs.readFileSync(filePath);
    const existing_scores = JSON.parse(fileData);
    existing_scores.push(comp)
    fs.writeFileSync(filePath,JSON.stringify(existing_scores));


    console.log(comp)
    res.send("<h1> Result Stored </h1>")
})
app.listen(3000);