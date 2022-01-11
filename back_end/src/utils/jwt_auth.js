const jwt=require("jsonwebtoken");
const config=require("config");

//Sign-JWT

const SignJWT=(payload,key,options)=>{
 return jwt.sign(payload,config.get(`Salt.${key}`),{
    expiresIn:config.get(`Salt.${options}`)
 });
}

