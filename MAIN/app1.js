var express=require('express');
var app =express();
var sign=require('./routes/sign_up.js');
var bodyparser=require('body-parser');
var assert=require('assert');
var session = require('express-session');
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var exec=require('exec');
const Schema=mongoose.Schema;

app.set('view engine','ejs');

app.use(express.static('./images'));
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
var conn=mongoose.connection;

const QuestionSchema=new Schema({
  Question :String,
  o1 :String,
  o2 :String,
  o3 :String,
  o4 :String,
  correct: Number
});
const QuestionS=mongoose.model('questionlist',QuestionSchema);
const UserSchema=new Schema({
  uname :String,
  email :{
    type:String,
    unique: true,
    required: true,
    trim: true
  },
  psw :{
    type:String,
    unique: true,
    required :true
  },
  college :String,
  dept :String,
  type: Number,
  status: String
});
const UserS=mongoose.model('userlist',UserSchema);



sign(app,UserS,QuestionS);

app.listen(3000);
console.log('you are listening to port 3000');
