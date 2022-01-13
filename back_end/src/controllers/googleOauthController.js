const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../utils/logger");
const UserDAO=require("../dbconfig/user");
const Token=require("../utils/jwt_auth");



const googleoauth=async (req,res,next)=>{
    const google_token_url="https://oauth2.googleapis.com/token";
    let google_code=req.query.code;
    const values={
        google_code,
        client_id:config.get('Google.client_id'),
        client_secret:config.get('Google.client_secret'),
        redirect_uri:config.get('Google.redirect_URL'),
        grant_type:"authorization_code"
    };
    
    try{
    
        const _res=await axios.post(google_token_url,new URLSearchParams(values).toString(),{
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(async ({ id_token,access_token})=>{
            let google_access_token_url=  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
            const res_=await axios.get(google_access_token_url,{
                headers: {
                    Authorization: `Bearer ${id_token}`
                  }
            });

            if(!res_.email_verified){
                return res.status(403).send("Google account is not verified");
            }
    
            if(res_.email_verified){
                let user_find=await UserDAO.finduser(res_.email,{name:res_.name,email:res_.email});
                let access_token=Token.access({name:res_.name,email:res_.email});
                if(user_find.value===null){ 
                    let refresh_token=Token.access({name:res_.name,email:res_.email});      
                    let updateRefreshToken=await UserDAO.updateRefreshToken(res_.email,refresh_token);
                    logger.info(updateRefreshToken);
                    // share the Access token to the ID and access-token
                    res.headers("x-access-token",access_token);
                    req.user={
                          email:res_.email,
                          ID:updateRefreshToken.value._id
                    }
                }else{
                    let decoded_val=Token.verify(user_find.value.refresh_token);
                        if(decoded_val.expired){
                            let refresh_token=Token.access({name:res_.name,email:res_.email});
                            let updateRefreshToken=await UserDAO.finduser(res_.email,{refresh_token:refresh_token});
                        }
                        // share the Access token to the ID and access-token
                        res.headers("x-access-token",access_token);
                        req.user={
                          email:res_.email,
                          ID:updateRefreshToken.value._id
                        }
                }
            }
            // Check it is verified or not   email_verified
            // Check if the user exist in MongoDB
            // If exists --> 
                 // Check Refresh Token - expiry
                 //  If RT(Not expires)
                       // Fine
                 //  else
                       //Create a new Refresh Token and replace in MongoDB                       
        });
    }catch(e){
            logger.warn(`----------------Google Oauth -------------------\n`,{e});
    }


}

module.exports={googleoauth};