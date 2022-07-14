const express=require('express');
const routes=express.Router();
const Controllers=require('../controllers/controllers');
const passport = require('passport');
require('../passport')
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

routes.get('/',Controllers.home);
routes.post('/',Controllers.register);
routes.post('/login',Controllers.login)
routes.get('/protected',passport.authenticate('jwt', { session: false }),Controllers.protected)
routes.post('/transact',Controllers.transact)
routes.post('/paydetail',Controllers.payDetail)
routes.post('/payments',Controllers.getPayment)
routes.get('/items',Controllers.getItems)
routes.post('/items',upload.single("file"),Controllers.postItems)
module.exports=routes;