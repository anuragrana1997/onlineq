module.exports=function(app,UserS,QuestionS){
var session = require('express-session');
var express=require('express');
var bodyparser=require('body-parser');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;
mongoose.Promise=global.Promise;
var assert=require('assert');
var exec=require('exec');
var sess;

var urlencodedparser=bodyparser.urlencoded({extended:false});


mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
var conn=mongoose.connection;

app.set('view engine','ejs');
app.use('/images', express.static('images'));
app.use(session({secret:'gg'}));

app.get('/login',function(req,res){
  req.session;
  if(req.session.type==2)
  {
    res.render('studenthome');
  }
  else if(req.session.type==0)
  {
    res.render('adminhome');
  }
  else if(req.session.type==1)
  {
    res.redirect('teacherhome');
  }
  else
  {
  res.render('login',{qs: req.query});
}
});


app.get('/signup',function(req,res){
  res.render('signup',{qs: req.query});
});



app.post('/login',urlencodedparser,function(req,res){
  conn.collection('Users').findOne({email:req.body.email},function(err,result){
    if(err)
    {
      throw err;
    }
    if(result)
    {
      if(result.psw===req.body.psw && result.status=="active")
      {
        req.session.email=req.body.email;
        req.session.psw=req.body.psw;
        if(result.type==0)
        {
            res.redirect('adminhome');
        }
        else if(result.type==1)
        {
            res.redirect('teacherhome');
        }
        else {
          res.redirect('studenthome');
        }
      }
      else
      {
        res.render('login');
      }
    }
    res.end();
  });
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err)
    console.log(err);
    else {
      res.redirect('login');
    }
  });
});

app.post('/signup',urlencodedparser,function(req,res){
  var data=req.body;
  var gg="active";
  var user=new UserS({
    uname: data.uname,
    email: data.email,
    psw: data.psw,
    college: data.college,
    dept: data.dept,
    type: 2,
    status: gg
  });
  conn.collection('Users').insertOne(user);
  res.render('login',{qs: req.query});
});

app.get('/adminhome',urlencodedparser,function(req,res){
  res.render('adminhome');
});

function checkAuth(req, res, next) {
  if (!req.session.email) {
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

app.get('/admin/tlist',checkAuth,function(req,res){
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


app.get('/admin/slist',checkAuth,function(req,res,next){
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


app.get('/admin/alist',checkAuth,function(req,res,next){
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


app.get('/admin/edit',checkAuth, function(req,res){
  res.render('editinfo');
});



app.post('/admin/edit',checkAuth,urlencodedparser,function(req,res){
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

app.get('/studenttest',checkAuth,urlencodedparser,function(req,res){
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

app.get('/studenthome',checkAuth,function(req,res) {
  res.render('studenthome');
});
var mark=0;
const TestSchema=new Schema({
  name: String,
  value :String
});
const testt=mongoose.model('testlist',TestSchema);

app.post('/studenttest',checkAuth,urlencodedparser,function(req,res){
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
app.get('/Endtest',checkAuth,function(req,res){
  console.log(mark);
  res.redirect('studenthome');
});

app.get('/teacher',checkAuth,urlencodedparser,function(req,res){
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
      res.render('teacher',{qlist: resultArray2});
    });
  });
});

app.get('/teacherhome',checkAuth,function(req,res) {
  res.render('teacherhome');
})


app.post('/teacher',checkAuth,urlencodedparser,function(req,res){
  var data=req.body;
  var question=new QuestionS({
    Question: data.Question,
    o1: data.o1,
    o2: data.o2,
    o3: data.o3,
    o4: data.o4,
    correct: data.correct
  });
  conn.collection('Questions').insertOne(question);
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
      res.render('teacher',{qlist: resultArray2});
    });
  });
});

app.get('/newtest',checkAuth,function(req,res){
  conn.collection('Questions').drop(function(err){
      console.log("collection removed");
  });
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
      res.render('teacher',{qlist: resultArray2});
    });
  });
});
};
