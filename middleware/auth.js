const config=require("config");
const jwt=require("jsonwebtoken");

function auth(req, res, next){
    const token=req.header('x-auth-token');

    if(!token)
        res.status(401).json({msg:"Unauthorized"});
    
    //Verify
    try{
        const decoded=jwt.verify(token, config.get("jwtSecret"));
        //Add user from payload
        req.user = decoded;
        next();
    }
    catch(exc){
        res.status(400).json({msg: exc})
    }
}

module.exports=auth;