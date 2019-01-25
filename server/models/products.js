var mongoose=require('mongoose');





var Schema = mongoose.Schema;

var local=new Schema({
_id: Schema.ObjectId,
Name: String,
Price:Number,
imagepic:String,
mdate:String,
brand:String,
category_id:String,
Sale:String,
Sizes:String,
Colors:String,
Description:String,
images:[{imagepic:String,
_id:Schema.ObjectId,
Originalname:String,
}],
subcategories:[
    
]
    
}, {versionKey:false});

module.exports=mongoose.model('product',local);