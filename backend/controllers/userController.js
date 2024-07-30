import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth  user/set token 
// route    Post /api/users/auth or login 
// @access  Public 

const authUser = asyncHandler(async (req, res) => {

    const {email,password}=req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id, "user");
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("invalid email or password");
    }
});

// route    Post /api/users ; register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password}=req.body;

    const userExists=await User.findOne({email:email});

    if(userExists){
        res.status(400);
        throw new Error('user already exists'); 
    }

    const user=await User.create({
        name,
        email,
        password
    })

    // const user = new User({
    //     name,
    //     email,
    //     password,
    // });

    // await user.save();
    // console.log("User created:", user); 

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
});

// route    Post /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({ message: "user logged out" });
});

// route    Post /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }

    res.status(200).json(user);
});

// route    Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user=await User.findById(req.user._id);

    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

        if(req.body.password){
            user.password=req.body.password;
        }

        const updatedUser=await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });

    }else{
        res.status(404);
        throw new Error('user not found')
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}