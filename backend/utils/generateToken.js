import jwt from "jsonwebtoken";

const generateToken=(res,userId,role) =>{
    const token=jwt.sign({userId,role},process.env.JWT_SECRET,{expiresIn:'1m'});

    console.log('token generated :',token);    

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',  // secure true in production
        sameSite:'strict',      //prevent csrf attack
        maxAge: 30 * 24 * 60 * 60 * 1000 

    })
}


export default generateToken;