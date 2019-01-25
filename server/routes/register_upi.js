var auth=require('../auth/auth.js');
var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var local1=require('../models/register.js');
var local2=require('../models/country.js');



router.get('/list/:id',function(req,res){
    // console.log('list2/:cid'+req.params.id)
     var id=req.params.id;
     local2.find({"_id":mongojs.ObjectId(id)},{states:1,_id:0},function(err,docs){
 
         if(err) console.log(err);
         res.send(JSON.stringify(docs));
     });
 });


 router.post('/register',function(req,res){
    local1.findOne({Username:req.body.Username},function(err,existinguser){
    if(existinguser){
        return res.status(409).send({message:'Username already exists'});
    }
    var local=new local1({
   Username:req.body.data.Username,
   Name:req.body.data.Name,
   Email:req.body.data.Email,
   Username:req.body.data.Username,
   Password:req.body.data.Password,
   Country_id: req.body.data.Country_id,
   state_id:req.body.data.state_id,
   City:req.body.data.City,
   });
   console.log(local);
   local.save(function(err,result){
    if(err){
       res.send({message:err.message});
    }
    res.send({success:true,token:auth.createJWT(result)});
    console.log("result");
    console.log(result);
})
 });
});

router.post('/login',function(req,res){
    console.log("login called");
    console.log(req.body);
    local1.findOne({Username:req.body.Username},'+Password',function (err,user) {
        if(!user){
            return res.json({error:false,message:"Username is incorrect"});
        }
        user.comparepassword(req.body.Password,function(err,isMatch){
           
        if(!isMatch){
            return res.json({success:false,message:"Wrong password"});
        }
        res.json({success:true,token:auth.createJWT(user),Username:user.Username,_id:user._id});
        
        console.log(auth.createJWT(user));
    });


});

});


 
 router.get('/country',function(req,res){
   
 
     local2.find({},function(err,docs){
     if(err) return console.log(err);
     else{
     
     res.send(JSON.stringify(docs));
     }
     res.end();
     });
 });

 module.exports = router;