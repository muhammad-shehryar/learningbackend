const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = express.Router()
const User = require("../models/User")

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user = await User.findOne({email:email})

        if(user){
            return res.status(500).json({msg:"User already registered"})
        }
        user =  new User({
            name,
            email,
            password
        })

        const mix = await bcrypt.genSalt(10)
        user.password = await bcrypt.compare(mix,password)

        const payload = {user:{id:user.id}}
        const token = jwt.sign(payload,process.env.JWT_SECRET_KET,{expiresIn:"1h"})
        res.json({token:token})

    }catch(error){
        console.error(error.message)
        res.status(500).json({msg:"server error"})
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email:email})

        if(!user){
            return res.status(500).json({msg:"no user found "})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({msg:"not matched"})
        }
        const payload = {user:{id:user.id}}
        const token=jwt.sign(payload,process.env.JWT_SECRET_KET,{expiresIn:"1h"})
        res.json({token})
    }catch(error){
        console.log(error)
        res.status(500).json("server error")
    }
})

module.exports = router;