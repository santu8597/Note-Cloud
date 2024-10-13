const jwt=require('jsonwebtoken');
const JWT_SECRET='webtoken';
const fetch=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.send(401).json({error:"not a valid token"});
    }
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();

}


















module.exports=fetch