import mongoose from "mongoose"
import postMessage from "../models/postMessages.js"


export const getPost = async (req, res) => {

    try {
        const postMessages = await postMessage.find()
        res.status(200).json({
            status: "success",
            data: postMessages
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }

}
export const createPost = async (req, res) => {
    const post = req.body
    console.log(post)
    const newPost = new postMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json({
            status: "success",
            post: newPost
        })

    } catch (error) {
        res.status(409).json({
            status: 'fail',
            message: err.message
        })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post=req.body
   
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ status: "fail", message: "NO post in this db related to this id" })
    
    const updatePost = await postMessage.findByIdAndUpdate(req.params.id, {...post,_id}, {
        new: true,
      });
    res.status(200).json({
        status:"success",updatePost
    })

}
export const deletePost =async (req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: "fail", message: "NO post in this db related to this id" })
   await postMessage.findByIdAndRemove(id)
res.status(200).json({
    message:"post succesfully delete"
})
}
export const likePost=async (req,res)=>{
    const {id}=req.params
    if(!req.userId) return res.json({message:"unauthnticated"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ status: "fail", message: "NO post in this db related to this id" })

const post=await postMessage.findById(id)
const index=post.likes.findIndex((id)=>id===String(req.userId))
if(index===-1){
    // likepost
    post.likes.push(req.userId)
}
else{
    // dislike post
    post.likes=post.likes.filter((id)=>id!==String(req.userId))
}
const updatep= await postMessage.findByIdAndUpdate(id,post,{new:true})
res.status(200).json({
    data:updatep
})

}