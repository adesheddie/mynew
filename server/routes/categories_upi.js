var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var local=require('../models/categories.js');
var multer=require('multer');
var fs=require('fs');
var filename1=[];



router.get('/list',function(req,res){
  

    local.find({},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

router.post('/add',function(req,res){
 console.log('/add----------------------------');
console.log(req.body.data);
  
    var data= {
        _id:mongojs.ObjectId(),
        Name:req.body.data.Name,
        subcategories:{_id:mongojs.ObjectID(),Subnames:req.body.data.Subnames}
    }
var newrecord=new local(data);
newrecord.save(function(err,result){
    
    if(err){
        res.status(500).send({mesage:err.message});
        res.send(200).end();
    
    }
});



});
router.post('/update',function(req,res){
    console.log(req.body);
    //var id=req.body._id;   //update id
    var query={'_id':mongojs.ObjectId(req.body._id)};
    var update={Name:req.body.data.Name,
      
        };
       
    local.findOneAndUpdate(query,update,function(err,docs){
        if(err) throw err;
        console.log("Success");

        res.send({msg:"Success"});
    });


    
});

router.post('/updatesub',function(req,res){
    console.log(req.body.data);
    
    var id=req.body.data.sid;   //update id
    var data={_id:mongojs.ObjectId(),Subnames:req.body.data.Subnames};
    var query={'_id':mongojs.ObjectId(id)};
    console.log(data);
    local.findOneAndUpdate(query,{$push:
    {subcategories:data}
},function(err,docs){
        if(err) throw err;
        console.log("Success");

        res.send({msg:"Success"});

    });

    
});
router.put('/savesub/:id',function(req,res){
    console.log(req.body.data);
    console.log('savesub');
    var id=req.params.id;   //update id
    console.log(req.params.id);
    var data={_id:mongojs.ObjectId(),Subnames:req.body.data.Subnames};
    var query={'_id':mongojs.ObjectId(id)};
    console.log(data);
    local.findOneAndUpdate(query,{$push:
    {subcategories:data}
},function(err,docs){
        if(err) throw err;
        console.log("Success");

        res.send({Message:'Success'}) ;
    });
      
});






router.get('/list/:id',function(req,res){
    // console.log('list2/:cid'+req.params.id)
     var id=req.params.id;
     local.find({"_id":mongojs.ObjectId(id)},{subcategories:1,_id:0},function(err,docs){
 
         if(err) console.log(err);
         res.send(JSON.stringify(docs));
     });
 });
router.post('/deletesub/:id',function(req,res){
    console.log(req.body.data);
    var id=req.params.id;
    console.log(req.params.id);
    local.findOne({'subcategories._id':id},function(err,result){
    
    if(err) throw err;
    result.subcategories.id(id).remove();
    result.save();
       res.json(result);
       
    });
    

    
});

router.post('/del',function(req,res){
        
console.log(mongojs.ObjectId(req.body.data._id));
var query={'_id':mongojs.ObjectId(req.body.data._id)};
console.log(query);
local.findByIdAndRemove(mongojs.ObjectId(req.body.data._id),function(err){

    if(err) res.send(err);
    else
    res.send({Message:'Success'}) ;
});



    
});

module.exports = router;