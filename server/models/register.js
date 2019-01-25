var mongoose=require('mongoose');
var Schema = mongoose.Schema;
bcrypt=require('bcryptjs');






var userschema=new Schema({
Name: String,
Email: String,
Created:{type:Date},
Updated:{type:Date},
Username:{type:String,unique:true},
Password:{type:String,select:false},
Country_id: Schema.ObjectId,
state_id: Schema.ObjectId,
City: String,
}, {versionKey:false});



userschema.pre('save',function(next){
    now=new Date();
    this.Updated=now;
    if(!this.Created){
        this.Created=now;
    }
    var user=this;
    if(!user.isModified('Password')){
        return next();
    }

    bcrypt.genSalt(10,function(err,Salt){
        bcrypt.hash(user.Password,Salt,function(err,hash){
            user.Password=hash;

            next();
        });

    });




 });

 userschema.methods.comparepassword=function(Password,done){
     bcrypt.compare(Password,this.Password,function(err,isMatch){       
         //Password:-> string pass, this.password-> saved password
        done(err,isMatch);
     });
 }



module.exports=mongoose.model('register',userschema);