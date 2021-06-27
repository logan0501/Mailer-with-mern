const router=require('express').Router()
const mongoose =require('mongoose')
const users=mongoose.model('users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {secret}=require('../config/Keys')

router.post('/login',(req,res)=>{
    var {mail,password}=req.body;
    console.log(mail,password)
    users.findOne({mail:mail}).then(data=>{
        if(!data){
            console.log("Email not present")
            return res.json({
                "err":"Check your mail Id"
            })
        }
        bcrypt.compare(password,data.password).then(match=>{
            if(match){
                var token=jwt.sign({_id:data._id},secret)
                return res.json({
                    token,
                    user:data
                })
            }
            return res.json({
                "err":"Check your password"
            })
        })
    })
})
router.post('/signup',(req,res)=>{
    var {username,mail,password}=req.body;
    bcrypt.hash(password,12).then(hashedpass=>{
        users.findOne({mail:mail}).then(saveduser=>{
            if(saveduser){
                console.log("Already prsesent")
                return res.status(442).json({
                    "err":"Mail id already in use"
                })
            }
            const data=new users({
                name:username,
                mail:mail,
                password:hashedpass
            })
            data.save().then(dbresponse=>{
                return res.status(200).json({
                    "msg":"User created successfully"
                })
            }).catch(err=>{
                console.log(err)
                return res.json(442).json({
                    "err":err.message
                })
            })

        })
        
    })


} )

module.exports=router