var express = require('express');
var path= require('path');
var app = express();

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
	res.send("Sever is running ....!");
});

app.get('/analysis.html',function(req,res){
	res.sendFile(path.join(__dirname + "analysis.html"));
});


app.listen(3000);	
console.log("Listening on 3000 port");