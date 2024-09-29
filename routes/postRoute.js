const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const authMiddleware = require("../authMiddleware/auth")

router.post("/",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await new Post({
            title,
            content,
            author:req.user.id,
        })
        const newpost = await post.save()
        res.json(newpost)
    }catch(error){
        res.status(500).json({msg:"new post error"})
    }
})

router.get("/",async(req,res)=>{
    try{
        let post = await Post.find().populate('author',['name','email'])
        let allpost = await post.save()
        res.json(allpost)
    }catch(error){
        res.status(500).json({msg:"server error"})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id).populate('author',['name','email'])

        if(!post){
            return res.status(500).json({msg:"no post"})
        }
         post =await post.save()
        
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"server error"})
    }
})

router.put("/:id",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await Post.findById(req.params.id).populate('author'['title','content'])
        if(!post){
            return res.status(500).json({msg:"no post found"})
        }
        post = await Post.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        const newpost = await post.save()
        res.json({newpost})

    }catch(error){
        console.log(error.message)
        res.status(500).json({msg:"server error"})
    }
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        let npost = await Post.findById(req.params.id)
        if(!npost){
            return res.status(400).json({msg:"no post"})
        }
        npost = await Post.remove()
        res.json({msg:"post deleted"})
    }catch(error){
        return res.status(400).json({msg:"error"})
    }
})

module.exports = router;