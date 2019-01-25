var express=require('express');
var bodyParser=require('body-parser'); //post
var app=express();
var fs=require('fs');
var urlencodedParser=bodyParser.urlencoded({extended:false});  //post

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


var path=require('path');
app.use(express.static(path.join(__dirname,'uploads')));

//var mongoose=require('mongoose');
mongoose.connect('mongodb://adesheddie:gaming619*@ds121495.mlab.com:21495/shoppy');

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
    
    
    
    });

var userroutes=require('./server/routes/register_upi');
app.use('/register',userroutes);


var userroutes1=require('./server/routes/products_upi');
app.use('/products',userroutes1);

var userroutes2=require('./server/routes/categories_upi');
app.use('/categories',userroutes2);

var userroutes3=require('./server/routes/current_upi');
app.use('/current',userroutes3);

app.get('/',function(req,res){
    console.log(req);
    res.send('Ecom Backend Running...' + req.connection.remoteAddress);
})
app.listen(process.env.PORT || 3001);

console.log('Running with localhost:3000/');
