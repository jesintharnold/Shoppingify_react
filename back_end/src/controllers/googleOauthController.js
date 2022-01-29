const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../utils/logger");
const UserDAO=require("../dbconfig/user");
const Token=require("../utils/jwt_auth");


const googleoauth=async (req,res,next)=>{
    
    let google_code=req.query.code;
    const values={
        code:google_code,
        client_id:config.get('Google.client_id'),
        client_secret:config.get('Google.client_secret'),
        redirect_uri:config.get('Google.redirect_URL'),
        grant_type:"authorization_code",
    };
   
    try{
        const _res=await axios.post(config.get('AuthURL.GoogleOauth'),new URLSearchParams(values).toString(),
        {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        ).then(async (x)=>{
          
            let google_access_token_url= `${config.get('AuthURL.GoogleUserInfo')}${x.data.access_token}`;
            const res_=await axios.get(google_access_token_url,{
                headers: { 
                    Authorization: `Bearer ${x.data.id_token}`
                  }
            });

            let {email,name,verified_email}=res_.data;

            if(!verified_email){
                return res.status(403).send("Google account is not verified");
            }
    
            if(verified_email){
                let user_find=await UserDAO.finduser({email,user_payload:{"name":name,"email":email}});
                let access_token=Token.access({name:name,email:email});

                if(user_find.value===null){ 
                    let refresh_token=Token.access({name:name,email:email});   

                    let updateRefreshToken=await UserDAO.finduser({email:email,user_payload:{
                        "refresh_token":refresh_token
                    }});

                    logger.warn(user_find);
                    res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_find.lastErrorObject.upserted}`);

                }else{
                    let decoded_val=Token.verify(user_find.value.refresh_token);
                    
                    if(decoded_val.expired){
                            let refresh_token=Token.access({name:name,email:email});
                            let updateRefreshToken=await UserDAO.finduser({email:email,user_payload:{refresh_token:refresh_token}});
                        }
                         
                    res.redirect(`${config.get("clientOrgin")}/login/auth/${access_token}/${user_find.value._id}`);
                    
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
            res.redirect(`${config.get("clientOrgin")}/login}`);
    }


}

module.exports={googleoauth};