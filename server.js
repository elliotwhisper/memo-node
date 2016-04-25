"use strict";

var path = require('path');
var http = require('http');
var express = require('express');
var Database = require('./database');

var db = new Database('memo.sqlite3');
var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/memo', function(req, res){
    db.allMemo(function(err, datas){
	console.log(datas);
	db.close();
    });
});

app.post('/', function(req, res){

});

var server = http.createServer(app);
server.listen(10080, '0.0.0.0', function(){
    console.log('Listening on port 10080...');
});
