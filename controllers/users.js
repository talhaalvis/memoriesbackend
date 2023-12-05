import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signIn= async(req,res)=>{
    try {
        const {email,password}=req.body
        const existingUser= await User.findOne({email})
        if(!existingUser) return res.json({message:"There is no user of this email address"})
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
    if(!isPasswordCorrect) return res.status(404).json({message:"invalid cerdentials "})
    const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"})
const result=existingUser
res.status(200).json({result,token})



    } catch (error) {
        console.log(error)
        
    }

}


export const signUp= async(req,res)=>{
    
    try {
        const {email,password,confirmPassword,firstName,lastName}=req.body
        const existingUser= await User.findOne({email})
        if(existingUser) return res.json({message:"user Already exit "})

        if(password!==confirmPassword) return res.status(400).json({message:'Password dont match'})
        const hashPassword= await bcrypt.hash(password,12)

        const result= await User.create({email,password:hashPassword,confirmPassword,firstName,lastName})
    const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"})
res.status(200).json({result,token})




        
        
    } catch (error) {
        res.json({message:error.message})
        
    }

}