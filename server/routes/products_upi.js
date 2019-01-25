var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var local=require('../models/products.js');
var curr=require('../models/current.js');
var categories=require('../models/categories.js');
var multer=require('multer');
var fs=require('fs');
var filename1=[];
//npm install multer in node folder
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        var _fname = mongojs.ObjectId()+file.originalname;
        filename1.push({imagepic:_fname,Originalname:file.originalname,_id:mongojs.ObjectId()});
        cb(null,_fname);
    }
});
var upload=multer({storage:storage});


router.get('/list',function(req,res){
  

    local.find({},function(err,docs){
    if(err) return console.log(err);
    else{
    console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

router.get('/homeproducts',function(req,res){
  

    local.find({},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});
router.get('/menproducts',function(req,res){
  

    local.find({category_id:'5b6012369d825121700e5853'},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

router.get('/womenproducts',function(req,res){
  

    local.find({category_id:'5c36eb5aa988d70fe41fdefa'},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});


router.get('/saleproducts/:cid',function(req,res){
  console.log("Check sale id here");
    console.log(req.params.cid);
    local.find({category_id:'5b6012369d825121700e5853',Sale:req.params.cid},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

router.get('/womensaleproducts/:cid',function(req,res){
    console.log("Check sale id here");
      console.log(req.params.cid);
      local.find({category_id:'5c36eb5aa988d70fe41fdefa',Sale:req.params.cid},function(err,docs){
      if(err) return console.log(err);
      else{
      //console.log(docs);
      res.send(JSON.stringify(docs));
      };
      res.end();
      });
  });
  
  router.get('/elecsaleproducts/:cid',function(req,res){
    console.log("Check sale id here");
      console.log(req.params.cid);
      local.find({category_id:'5b59b43e90ce06a5b8e93d17',Sale:req.params.cid},function(err,docs){
      if(err) return console.log(err);
      else{
      //console.log(docs);
      res.send(JSON.stringify(docs));
      };
      res.end();
      });
  });



router.get('/list1/:id',function(req,res){
    console.log('Check Id Here');
    console.log(req.params.id);
     var id=req.params.id;
     console.log("CHECK HERE");
     console.log(id);
     
     local.find({"subcategories.subnames":{ $in: [id] }},function(err,docs){
        console.log(docs);
         if(err) console.log(err);
         res.send(JSON.stringify(docs));
     });
 
 
 
 });


//for single page
 router.get('/list2/:id',function(req,res){
    // console.log('list2/:cid'+req.params.id)
     var id=req.params.id;
     console.log("CHECK HERE");
     console.log(id);
     local.find({_id:id},function(err,docs){
 
         if(err) console.log(err);
         console.log(docs);
         res.send(JSON.stringify(docs));
         
     });
 
 
 
 });


router.get('/list121',function(req,res){
  
console.log("GET LAPTOPS");
    local.find({category_id:"5b59b43e90ce06a5b8e93d17"},function(err,docs){
    if(err) return console.log(err);
    else{
    //console.log(docs);
    res.send(JSON.stringify(docs));
    };
    res.end();
    });
});

router.post('/add',upload.array("uploads[]",12),function(req,res){
 console.log('/add----------------------------');
console.log(req.body);

    
    
var s=[];


    var data= {
        _id:mongojs.ObjectId(),
        Name:req.body.name,
        Price:req.body.price, 
        Sale:req.body.Sale,  
        Description:req.body.Description,
        mdate:req.body.mdate,
        brand:req.body.brand,
        images:filename1,
        Sizes:req.body.Sizes,
        Colors:req.body.Colors,
        category_name:req.body.category_name,
        category_id:req.body.category_id,
        subcategories:JSON.parse(req.body.subarr),
    }

var newrecord=new local(data);
newrecord.save(function(err,result){
    filename1.length=0;
    if(err){
        res.status(500).send({mesage:err.message});
    }
    res.status(200).send({msg:"Success"});
});



});
router.post('/update',upload.array("uploads[]",12),function(req,res){
    console.log("Old Images");
    console.log(req.body.oldimages);
    //var id=req.body._id;   //update id
    var query={'_id':mongojs.ObjectId(req.body._id)};

    var _newfile = JSON.parse(req.body.oldimages);
    console.log("Here is _new File before push");
    console.log(_newfile);
   


if(filename1.length>0){
    for(var i=0;i<filename1.length;i++){
        _newfile.push({imagepic:filename1[i].imagepic,Originalname:filename1[i].originalname,_id:mongojs.ObjectId()});
    }
        console.log("Here is _newfile After Push");
        console.log(_newfile);
    //_newfile = filename1;
    //fs.unlink('./uploads/'+req.body.imagepic,function(){});
}

    var update={Name:req.body.name,
        Price:req.body.price,
        mdate:req.body.mdate,
        Description:req.body.Description,
        brand:req.body.brand,
        Sale:req.body.Sale,
       images:_newfile,
       Sizes:req.body.Sizes,
       Colors:req.body.Colors,
        category_id:req.body.category_id,
        subcategories:JSON.parse(req.body.subarr)
        };
        console.log('--------------update-------');
        console.log(update);
        console.log(query);
    local.findOneAndUpdate(query,update,function(err,docs){
        if(err) throw err;
        console.log("Success");
        filename1=null;
      filename1=[];
        res.send({msg:"Success"});
    });
       
});



router.post('/removeimgs',function(req,res){
    console.log('Here is Body');
console.log(req.body.data);
var query={'images._id':mongojs.ObjectId(req.body.data._id)};
console.log(query);
local.findOne({'images._id':req.body.data._id},function(err,result){
    
    if(err) throw err;
    result.images.id(req.body.data._id).remove();
    result.save();
       res.json(result);
    });
});

router.post('/del',function(req,res){
    fs.unlink('./uploads/'+req.body.data.imagepic,function(){});
    
console.log(mongojs.ObjectId(req.body.data._id));
var query={'_id':mongojs.ObjectId(req.body.data._id)};
console.log(query);
local.findByIdAndRemove(mongojs.ObjectId(req.body.data._id),function(err){

    if(err) res.send(err);
    else
    res.send({Message:'Success'}) ;
});

//});
// router.delete('/del',function(req,res){
//     console.log(req.body.data);
//     var id=req.body.data.id;   //update id
//     var query={'_id':mongojs.ObjectId(id)};
//     var update={Name:req.body.data.name,State:req.body.data.state};
//     local.findOneAndUpdate(query,update,function(err,res){
//         if(err) throw err;
//         console.log("Success");


//     });
    //res.end("Success");

    
});




router.post('/current/:id',function(req,res){
    console.log('/add----------------------------');
   console.log(req.body.data);
   console.log(req.body.data[1]);

   for(var i=0;i<req.body.data.length;i++){
     
       var data1 = {
           _id:mongojs.ObjectId(),
           item_name:req.body.data[i].Name,
        special:req.body.data[i].special,
         amount:req.body.data[i].Price,
          quantity:req.body.data[i].quantity,
          uid:req.params.id
       }
     
   var newrecord=new curr(data1);
   newrecord.save(function(err,result){
       
       if(err){
           res.status(500).send({mesage:err.message});
       }
       
       newrecord=null;
       
    
   });

}
res.send({success:true});
   
   
   
   });


module.exports = router;