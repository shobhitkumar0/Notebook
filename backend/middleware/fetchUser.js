var JWT=require('jsonwebtoken');
const JWT_SECRET ="sourya"

const fetchUser=(req,res,next)=>{
    //get the user from the jwt token and append the ID
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please autheticate using a valid token"})
    }
    try {
        const data =JWT.verify(token,JWT_SECRET)
    req.user=data.user; next();
    } catch (error) {
        res.status(401).send({error:"Please autheticate using a valid token"})
    }
   
    
}

module.exports=fetchUser;