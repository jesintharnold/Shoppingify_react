const {logger}=require("../utils/logger");
const {ObjectId}=require("mongodb");
let user_collection;
class UserDAO{
    static async injectCol(db){
       if(user_collection){
           return
       }
       try{
           user_collection=await db.collection("users");
           logger.info("User collection connected");
       }
       catch(e){
            logger.error(`Error while connecting to User collection \n ${e}`);
       }
    }

    static async finduser(email,ID,user_payload){

        try{
            if(ID){
                return await user_collection.findOne({"_id":ObjectId(ID)}).toArray();
            }
            else{
                return await user_collection.findOneAndUpdate({"email":email},user_payload,{upsert: true,new: true}).toArray();
            }
        }
        catch(e){
            logger.error(`Unable to find the User - ${e}`);
            return 500;
        }
    
    }

    static async updateRefreshToken(token_payload,email){
        try{
            if(ID){
                return await user_collection.findOneAndUpdate({"email":email},{refreshtoken:token_payload}).toArray();
            }
    
        }
        catch(e){
            logger.error(`Unable to update Refresh token - ${e}`);
            return 500;
        }
    }




}

module.exports=UserDAO;