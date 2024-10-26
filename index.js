const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res){
    fs.readdir(`./files`, function(err, files){ //an inbuilt function of node.js for reading a file. Read from node.org docs
        res.render("index", {files: files});//this sends the file data from file folder into index.ejs file in the form 
    })    
})

app.post("/create", function(req, res){   // after submission our data will come on this route
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){ //1st to give the file name as an argument of the function we will split the title and it waill form an array of the string words and then on joining with nothing('') it will be modified into a single string
    res.redirect("/"); // while creating the file go on to the post route and after creation of the file comeback to the original route "/" where a new file will be present to be read
   }); 
   
})

app.listen(3000);