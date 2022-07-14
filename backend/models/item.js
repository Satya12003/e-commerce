const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const itemSchema = new Schema({
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
    file:{
        type:String
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

const Item = mongoose.model('items',itemSchema);
module.exports=Item;