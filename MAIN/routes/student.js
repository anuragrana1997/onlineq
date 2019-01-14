module.exports = function(app,UserS,QuestionS){
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

app.get('/studenttest',urlencodedparser,function(req,res){
  var resultArray2 = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer2 =conn.collection('Questions').find();
    pointer2.forEach(function(doc1,err){
      assert.equal(null,err);
      resultArray2.push(doc1);
    },function(){
      conn.close();
      res.render('studenttest',{testlist: resultArray2});
    });
  });
});

app.get('/studenthome',function(req,res) {
  res.render('studenthome');
});
var mark=0;
const TestSchema=new Schema({
  name: String,
  value :String
});
const testt=mongoose.model('testlist',TestSchema);

app.post('/studenttest',urlencodedparser,function(req,res){
  if(req.body.group==req.body.correct)
  {
    mark+=1;
  }
  var resultArray2 = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer2 =conn.collection('Questions').find();
    pointer2.forEach(function(doc1,err){
      assert.equal(null,err);
      resultArray2.push(doc1);
    },function(){
      conn.close();
      res.render('studenttest',{testlist: resultArray2});
    });
  });
});
app.get('/Endtest',function(req,res){
  console.log(mark);
  res.redirect('studenthome');
});
};
