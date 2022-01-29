const {logger}=require("../utils/logger");
const Token=require("../utils/jwt_auth");
const config=require("config");
const UserDAO=require("../dbconfig/user");



const checkauth=async (req,res,next)=>{

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        let access_token=req.headers.authorization.split(" ")[1];
        try {
            const {expired,decode} = await Token.verify_Token(access_token);
            if(!expired){ //True
            //    let exp_=decode.exp-120;
            //    // Sending access Token before expiry - of 2mins
            //    if(((Date.now()/1000)-exp_)>=0&&req.user!==undefined){
            //     let user_details=await UserDAO.findprotectuser(req.user.email);
            //         // check user_details output
            //     let {decode}=await Token.verify_Token(user_details.refresh_token);
            //         //decode.email decode.name
            //     let access_token=await Token.access({email:decode.email,name:decode.name});
            //     res.headers("x-access-token",access_token);
                next();
            //    }else{
            //     res.status(401).json({Error:'Authorization failed! Please login again'});
            //    } 
            }else{ 
                res.status(401).json({Error:'Authorization failed! Please login again'});
            }
        }catch (err){
            res.status(401).json({Error:'Authorization failed! Please login'});
        }
    }else{
        res.status(401).json({Error:'Unauthorized Access'});
    }
}

module.exports=checkauth;