module.exports=function(app,UserS,QuestionS){
var express=require('express');
//var app=express();
var sign=require('./sign_up.js');
var bodyparser=require('body-parser');
const mongoose=require('mongoose');
var assert=require('assert');
const Schema=mongoose.Schema;
mongoose.Promise=global.Promise;
var ObjectID = require('mongodb').ObjectID;
var urlencodedparser=bodyparser.urlencoded({extended:false},{ useNewUrlParser: true });

//app.set('view engine','ejs');
app.get('/adminhome',urlencodedparser,function(req,res){
  res.render('adminhome');
});

function checkAuth(req, res, next) {
  if (!) {
    res.redirect('login');
  } else {
    next();
  }
}

app.get('/admin',checkAuth,function(req,res){
  var resultArray = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer =conn.collection('Users').find();
    pointer.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);
    },function(){
      conn.close();
      res.render('admin',{list: resultArray});
    });
  });
});

app.get('/admin/tlist',function(req,res){
  var resultArray = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer =conn.collection('Users').find();
    pointer.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);

    },function(){
      conn.close();
      res.render('admintlist',{list: resultArray});
    });
  });
});


app.get('/admin/slist',function(req,res,next){
  var resultArray = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer =conn.collection('Users').find();
    pointer.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);

    },function(){
      conn.close();
      res.render('adminslist',{list: resultArray});
    });
  });
});


app.get('/admin/alist',function(req,res,next){
  var resultArray = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer =conn.collection('Users').find();
    pointer.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);

    },function(){
      conn.close();
      res.render('adminalist',{list: resultArray});
    });
  });
});


app.get('/admin/edit', function(req,res){
  res.render('editinfo');
});



app.post('/admin/edit',urlencodedparser,function(req,res){
  var item={
    uname: req.body.uname,
    email: req.body.email,
    psw: req.body.psw,
    college: req.body.college,
    type: req.body.type,
    status: req.body.status
  };
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
  var conn=mongoose.connection;
  conn.collection('Users').updateOne({ email: req.body.email }, {$set: item}, function(err, result){
    assert.equal(null,err);
    console.log("item updated");
  });
  //conn.close();
  var resultArray = [];
  mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err,db){
    var conn=mongoose.connection;
    assert.equal(null,err);
    var pointer =conn.collection('Users').find();
    pointer.forEach(function(doc,err){
      assert.equal(null,err);
      resultArray.push(doc);

    },function(){
      conn.close();
      res.render('admin',{list: resultArray});
    });
  });
});
};
