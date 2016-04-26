'use strict';

var sqlite3 = require('sqlite3');

var Database = function(url){
    if (!(this instanceof Database)){
	return new Database(url);
    }
    if (!url){
	url = ':memory:';
    }
    this._db = new sqlite3.Database(url);
    this._init();
}

Database.prototype._init = function(){
    var sql = 'create table if not exists memo([id] INTEGER PRIMARY KEY, [time] TIMESTAME, [memo] TEXT)';
    this._db.run(sql);
}

Database.prototype.insertMemo = function(timestamp, memo, callback){
    this._db.run('insert into memo (time, memo) values (?, ?)', timestamp, memo);
}

Database.prototype.allMemo = function(callback){
    this._db.all('select * from memo', callback);
}

module.exports = Database;
