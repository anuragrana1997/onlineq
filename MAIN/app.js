var express= require('express');
var todocontroller=require('./controllers/todo_controller');
var app=express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));﻿

//fire controllers
todocontroller(app);

//listen to port
app.listen(4000)
console.log('you r listening to port 4000');
