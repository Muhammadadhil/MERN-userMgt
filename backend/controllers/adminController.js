import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';


export const adminLogin = asyncHandler(async (req,res) => {

    const {email,password}=req.body;    
    const userExists=await User.findOne({email});
    
    if(userExists && (await userExists.matchPassword(password))){
        if(userExists.isAdmin){
            generateToken(res,userExists._id,"admin");
            res.status(201).json({message:'success'});
        }else{
            res.status(400).json({message:'not an admin'});
        }

    }else{
        res.status(400).json({message:'incorrect email or password'})    
    }


}); 


export const getUsers=asyncHandler(async (req,res)=>{
    const users=await User.find({});
    res.status(200).json(users);
})


