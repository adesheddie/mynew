var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var local=require('../models/current.js');

router.post('/current/:id',function(req,res){
    console.log('/add----------------------------');
   console.log(req.body.data);
   console.log(req.body.data[1]);

   for(var i=0;i<req.body.data.length;i++){
     
       var data1 = {
           _id:mongojs.ObjectId(),
           item_name:req.body.data[i][0].item_name,

         amount:req.body.data[i][0].amount,
          quantity:req.body.data[i][0].quantity,
          uid:req.params.id
       }
     
   var newrecord=new local(data1);
   newrecord.save(function(err,result){
       
       if(err){
           res.status(500).send({mesage:err.message});
       }
       
       newrecord=null;
       
    
   });

}
res.send({success:true});
   
   
   
   });

   router.get('/orders/:id',function(req,res){
    console.log("Orders Called");
    
    local.find({'uid':req.params.id},function(err,docs){
        
        if(err) return console.log(err);
        else{
        //console.log(docs);
        res.send(JSON.stringify(docs));
        };
        res.end();
        });

});

router.get('/allorders',function(req,res){
    console.log("all Orders Called");
    
    local.find({},function(err,docs){
        
        if(err) return console.log(err);
        else{
        // console.log(docs);
        res.send(JSON.stringify(docs));
        };
        res.end();
        });

    });
    router.post('/update',function(req,res){
        console.log('req.body');
        console.log(req.body);
        var query={'_id':mongojs.ObjectId(req.body._id)};
        var update={Status:req.body.Status};
        console.log("Query and Update");
        console.log(query);
        console.log(update);
        local.findOneAndUpdate(query,update,function(err,docs){
            if(err) throw err;
            else 
            console.log('docs');
            console.log(docs);
            res.send({Message:'Success'}) ;
            
        
        });
        //res.end("Success");
    
        
    });

   router.get('/getcurrent',function(req,res){
  

    local.find({},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

   module.exports = router;