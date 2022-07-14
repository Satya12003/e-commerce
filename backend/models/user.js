const mongoose = require('mongoose');
const {isEmail}=require('validator');
const bcrypt =require('bcrypt');
const Schema=mongoose.Schema;
const productSchema = require('./product')

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'*Name is required'],
    },
    email:{
        type:String,
        required:[true,'*Email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'*Please enter Valid email']
    },
    password:{
        type:String,
        required:[true,'*Password is required'],
        minlength:[6,'*Minimum 6 characters required']
    },
    type:{
        type:String,
        required:[true]
    },
    registration_no:{
        type:String,
        length:[10]
    },
    products:[productSchema]
});

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();   
        this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth =await bcrypt.compare(password,user.password);
        if(auth){return user;}
        
        throw Error('*Incorrect Password');
    }
    
    throw Error('*Email not registered');
}
 


 

const User = mongoose.model('users',userSchema);
module.exports=User;