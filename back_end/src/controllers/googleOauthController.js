const config=require("config");
const axios=require("axios");
const { URLSearchParams } = require("url");
const {logger}=require("../utils/logger");


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
        }).then(({ id_token,access_token})=>{
            let google_access_token_url=  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
            const res_=await axios.get(google_access_token_url,{
                headers: {
                    Authorization: `Bearer ${id_token}`
                  }
            });

            // Check it is verified or not
            // Check if the user exist in MongoDB
            // If exists --> 
                 // Check Refresh Token - expiry
                 //  If RT(Not expires)
                       // Fine
                 //  else
                       //Create a new Refresh Token and replace in MongoDB                       
            // Else
                // Create a New User
            
            
            //Once we get Details Sign JWT and create a session for that User
        });


    }catch(e){
            logger.warn(`----------------Google Oauth -------------------\n`,{e});
    }


}

module.exports={googleoauth};