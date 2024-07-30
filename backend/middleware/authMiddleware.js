import jwt from "jsonwebtoken"; // we need to get the payload from the userId
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt; // with the help of cookieparser

    if (token) {
        try {   
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({ _id: decoded.userId }).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("not authorised , invalid token");
        }
    } else {
        res.status(401);
        throw new Error("not authorised, no token");
    }
}) ;

// const protectAdmin=asyncHandler(async (req,res,next)=>{
//     let token=req.cookies.jwt;

//     if(token){
//         try {
//             const decoded=jwt.verify(token,process.env.JWT_SECRET);
//             console.log('jwt decoded:',decoded);
            

//             // next();
//         } catch (error) {
//             res.status(402);
//             throw new Error('not authorised, no token')
//         }

//     }else{
//         res.status(401);
//         throw new Error('not authorised , no token');
//     }
//     console.log('protect admin mid!!');
//     // if(req.user ){
        
//     //     next();
//     // }else{
//     //     res.status(401)
//     //     throw new Error('not an admin')
//     // }
// })

export { protect};
