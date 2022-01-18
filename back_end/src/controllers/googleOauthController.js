const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../utils/logger");
const UserDAO=require("../dbconfig/user");
const Token=require("../utils/jwt_auth");
const { request } = require("http");

const googleoauth=async (req,res,next)=>{
    const google_token_url="https://oauth2.googleapis.com/token";
    let google_code=req.query.code;
    const values={
        code:google_code,
        client_id:config.get('Google.client_id'),
        client_secret:config.get('Google.client_secret'),
        redirect_uri:config.get('Google.redirect_URL'),
        grant_type:"authorization_code",
    };
    // logger.warn(`------------------`);
    // logger.error(values);
    // logger.warn(`------------------`);
    // logger.error(google_code);
    // logger.warn(`------------------`);
    try{
        const _res=await axios.post("https://oauth2.googleapis.com/token",new URLSearchParams(values).toString(),
        {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        ).then(async (x)=>{
          
            let google_access_token_url=  `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${x.data.access_token}`;
            const res_=await axios.get(google_access_token_url,{
                headers: { 
                    Authorization: `Bearer ${x.data.id_token}`
                  }
            });

            logger.error(`Google Access / ID tokens`);
            logger.info(res_);


            let {email,name,verified_email}=res_.data;

            if(!verified_email){
                return res.status(403).send("Google account is not verified");
            }
    
            if(verified_email){
                let user_find=await UserDAO.finduser({email,user_payload:{"name":name,"email":email}});
                let access_token=Token.access({name:name,email:email});

                logger.error(user_find.value);
                logger.info(access_token);

                if(user_find.value===null){ 
                    let refresh_token=Token.access({name:name,email:email});      
                    let updateRefreshToken=await UserDAO.finduser({email,user_payload:{
                        "refresh_token":refresh_token
                    }});
                    logger.info(updateRefreshToken);
                    //share the Access token to the ID and access-token
                    res.header("x-access-token",access_token);
                    req.user={
                          email:email,
                          ID:updateRefreshToken.value._id
                    };
                    res.status(200).send({msg:`Login success`});
                }else{
                    let decoded_val=Token.verify(user_find.value.refresh_token);
                    //logger.warn(decoded_val);
                    let updateRefreshToken;
                        if(decoded_val.expired){
                            let refresh_token=Token.access({name:name,email:email});
                            updateRefreshToken=await UserDAO.finduser({email,user_payload:{refresh_token:refresh_token}});
                        }
                        // share the Access token to the ID and access-token
                        logger.info(updateRefreshToken);
                        res.header("x-access-token",access_token);
                        req.user={
                          email:email,
                          ID:updateRefreshToken.value._id
                        }
                        res.status(200).send({msg:`Login success`});
                }
            };

            
            // Check it is verified or not   email_verified
            // Check if the user exist in MongoDB
            // If exists --> 
            //      Check Refresh Token - expiry
            //       If RT(Not expires)
            //            Fine
            //       else
            //            Create a new Refresh Token and replace in MongoDB  
            
            
        });
    }catch(e){
            logger.warn(e);
    }


}

module.exports={googleoauth};