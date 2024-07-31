import asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';

// route    Post /api/admin/     ; admin login 
// @access  Private
export const adminLogin = asyncHandler(async (req,res) => {

    const {email,password}=req.body;    
    const userExists=await User.findOne({email});
    
    if(userExists && (await userExists.matchPassword(password))){
        if(userExists.isAdmin){
            generateToken(res,userExists._id,"admin");
            res.status(201).json({
                id: userExists._id,
                name:userExists.name,
                email:userExists.email
            });
        }else{
            res.status(400).json({message:'not an admin'});
        }

    }else{
        res.status(400).json({message:'incorrect email or password'})    
    }

}); 

// route    Post /api/admin/getUsers 
// @access  Private
export const getUsers=asyncHandler(async (req,res)=>{
    const users=await User.find({});
    if(users){
        res.status(200).json(users);
    }else{
        res.status(400).json({message:'Error in fetching user details'});
    }
})

// route    Post /api/admin/logoutAdmin 
// @access  Private
export const logoutAdmin=asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({ message: "user loggedout successfully" });


})

// route    Post /api/admin/getUserDetails 
// @access  Private
export const getUserDetails=asyncHandler(async (req,res)=>{
    const userId=req.params.id;
    const userDetails=await User.findOne({_id:userId})
    res.status(200).json({userDetails})

})

// route    Post /api/admin/updateUserInfo 
// @access  Private
export const updateUserInfo=asyncHandler(async (req,res)=>{
    const {id,name,email}=req.body;
    const updatedUser=await User.findOneAndUpdate({_id:id},{$set:{name,email}},{upsert:true});
    if(updatedUser){
        res.status(200).json({message:"success"});
    }else{
        res.status(401)
        throw new Error('Error in updating user');
    }

})

// route    Post /api/admin/DeleteUser 
// @access  Private
export const deleteUser=asyncHandler( async (req,res)=>{
    const userId=req.params.id;
    const updated=await User.deleteOne({_id:userId});
    res.status(201).json({message:"deleted user"});
})



