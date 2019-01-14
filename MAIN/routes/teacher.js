module.exports = function teacher(app,UserS,QuestionS){
var session = require('express-session');
var express=require('express');
var bodyparser=require('body-parser');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
mongoose.Promise=global.Promise;
var assert=require('assert');
//var adm=require('./admin.js');

var exec=require('exec');

var urlencodedparser=bodyparser.urlencoded({extended:false});

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
var conn=mongoose.connection;


app.set('view engine','ejs');

};
