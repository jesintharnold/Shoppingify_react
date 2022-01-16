const {readFileSync}=require("fs");
const {resolve}=require("path");
const private_key="jesintharnold@gmail.com";
const public_key="jesinthadriel@gmail.com";
const {logger}=require("../utils/logger");
const jwt=require('jsonwebtoken');
class Token{
    static access(payload) {
       return jwt.sign(payload,private_key,{
        "expiresIn":"120s"
       });
    }
    static verify(token){
        try{
          const decode=jwt.verify(token,private_key);
          return {
           expired:false,
           decode
          };

        }
        catch(e){
           logger.warn(e);
           return {
              decode:null,
              expired:e.message==="jwt expired"
           }
        }
    }
 
 }

 

if(true){

    let access_token= Token.access({email:"Jesintharnold@gmail.com",name:"jesintharnold"});

    logger.warn(access_token);
     access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikplc2ludGhhcm5vbGRAZ21haWwuY29tIiwibmFtZSI6Implc2ludGhhcm5vbGQiLCJpYXQiOjE2NDIyNzMwNzYsImV4cCI6MTY0MjI3MzE5Nn0.Jm-HzIUz2OTtNH9_GmQm6L_lPr6DU-iWhCEzPLIkwx4";

       const decode = Token.verify(access_token);
        logger.error(`-------------------------------------------------------------------`);
        logger.warn(decode);

    try {
        

        if(true){

            
        }else{
            
        }
    }catch (err){
        
    }

}else{
    
}