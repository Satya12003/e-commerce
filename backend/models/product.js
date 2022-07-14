const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const productSchema = new Schema({
    name:{
        type:String,
        required:[true,'*Name is required'],
    },
    category:{
        type:String,
        required:[true],
    },
    price:{
        type:Number,
        required:[true]
    },
    color:{
        type:String,
        required:[true,'*Name is required'],
    },
    tags:{
        type:String,
        required:[true],
    },
    reviews:{
        type:Number,
        required:[true]
    }
});

module.exports=productSchema;