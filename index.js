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

app.get("/files/:filename", function(req, res){
   fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){ //UTF-8 is passed as an argument to convert buffer filedata in hexadecimal to english  
    res.render('show', {filename: req.params.filename, filedata: filedata}); // the parameter(url of the route) have the name of the file as we have use the val of the link to be included in the url in index.ejs file , for sending the filedata we read the request and filedata is stored in filedata  
   })
})

app.get("/edit/:filename", function(req, res){
  res.render('edit', {filename: req.params.filename});
})

app.post("/edit", function(req, res){
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
    res.redirect("/");
  })
})

app.post("/create", function(req, res){   // after submission our data will come on this route
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){ //1st to give the file name as an argument of the function we will split the title and it waill form an array of the string words and then on joining with nothing('') it will be modified into a single string
    res.redirect("/"); // while creating the file go on to the post route and after creation of the file comeback to the original route "/" where a new file will be present to be read
   }); 
})

app.listen(3000);