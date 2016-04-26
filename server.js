"use strict";

var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var Database = require('./database');

var dburl = process.env.MEMO_DB_URL || './memo.sqlite3';
var db = new Database(dburl);

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/memo', function(req, res){
    db.allMemo(function(err, datas){
	console.log(datas);
	res.send(datas);
    });
});

app.post('/', function(req, res){
    var memo = req.body.memo;
    if (memo){
	db.insertMemo(new Date(), memo, function(){});
    }
    res.send('OK');
});

var server = http.createServer(app);
server.listen(10080, '0.0.0.0', function(){
    console.log('Listening on port 10080...');
});
