import jwt from "jsonwebtoken";
import env from "envgaurd";

export const verifyToken = async(req , res , next)=>{
    try{
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({data:null,success:false,message:"unauthorised"});
    }
    const decoded = jwt.verify(token,env("JWT_SECRET"));
    if(!decoded){
        return res.status(401).json({data:null,success:false,message:"unauthorised"});
    }
    req.userId = decoded.id;
    next();
    }catch(err){
    console.log(err.message);
     return res.status(401).json({data:null,success:false,message:"unauthorised"});
    }
}