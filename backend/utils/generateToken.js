import jwt from "jsonwebtoken";

const generateToken=(res,userId) =>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });

    console.log('token:',token);

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',  // secure true in production
        sameSite:'strict',      //prevent csrf attack
        maxAge: 30 * 24 * 60 * 60 * 1000 

    })
}


export default generateToken;