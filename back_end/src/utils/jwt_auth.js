const jwt=require("jsonwebtoken");
const config=require("config");
const {readFileSync}=require("fs");
const {resolve}=require("path");
const {logger}=require("../utils/logger");
const private_key=readFileSync(resolve("key","private.key"),{encoding:'utf8', flag:'r'});
const public_key=readFileSync(resolve("key","public.key"),{encoding:'utf8', flag:'r'});

// TokenCreate .access .verfiy
class Token{
   static access(payload) {
      logger.warn('Sign - - Method')
      return jwt.sign(payload,private_key,config.get('Salt.access'));
   }
   static verify(token){
       try{
         const decode=jwt.verify(token,public_key);
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

module.exports=Token;








