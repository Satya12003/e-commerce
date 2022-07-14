const User = require('../models/user');
const Item = require('../models/item');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Razorpay = require('razorpay');
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public')
    },
    filename :(req,file,callback)=>{
        callback(null,file.original)
    }
})
const upload = multer({storage: storage});

const home = (req,res)=>{
    res.status(200).send("Hello User");
}

const register = async(req,res)=>{
    console.log(req.body);
    const {name,email,password,type}=req.body;
    try{
        const user = await User.create({name,email,password,type});
        res.status(200).send("User Registered");
    }catch(err){
        res.status(400).send("Error Occurred");
}
}

const login = async(req,res)=>{
    User.findOne({ email: req.body.email }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, 'secret', { expiresIn: '1d' })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
}

const protected = (req,res)=>{
    res.status(200).send( {
        success:true,
        user: {
            id: req.user._id,
            email: req.user.email,
        }
    });
}

const transact = (req,res)=>{
    const{payment_id,amount,method,receiver,email} = req.body;
    const pay = {
        payment_id:payment_id,
        amount:amount,
        method:method,
        receiver:receiver
    }
    console.log(pay);
   User.updateOne(
       {email:email},
       {
        $push:{payments:pay}
       }
   ).then((result)=>{res.status(200).send(result);}).catch((err)=>{console.log(err);})
}

const payDetail= async(req,res)=>{
    console.log(req.body);
    const {key,secret,payid} =req.body;
    var instance = new Razorpay({ key_id: key, key_secret: secret })
     const response = await instance.payments.fetch(payid).catch((e)=>console.log(e.body));
     console.log(response);
     res.status(200).send(response);
     
}

const getPayment =async(req,res)=>{
    const {email} = req.body;
    User.findOne({email:email}).then((result)=>{
        res.status(200).send(result.payments)
    }).catch((err)=>{res.status(400);console.log(err)})
}


const getItems = async(req,res)=>{
    Item.find({}).then((result)=>{
        res.status(200).send(result)
    }).catch((err)=>{res.status(400);console.log(err)})
}

const postItems = async(req,res)=>{
     const {name,category,price}=req.body;
     const file = req.file.file;
     try{
        const item = await Item.create({name,category,price,file});
        res.status(200).send("Item Created");
    }catch(err){
        res.status(400).send("Error Occurred");
}
     
}

module.exports={home,register,login,protected,transact,payDetail,getPayment,getItems,postItems}