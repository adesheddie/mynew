var mongoose=require('mongoose');





var Schema = mongoose.Schema;

var local=new Schema({
_id: Schema.ObjectId,
item_name: String,
amount:String,
quantity:String,
image:String,
special:String,
uid:String,
Status:String

},
 {versionKey:false});

module.exports=mongoose.model('current',local);