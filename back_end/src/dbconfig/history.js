const {logger}=require("../../utils/logger");
const {ObjectId}=require("mongodb");
let history_collection;

class HistoryDAO{
    static async injectCol(db){
        if(history_collection){
            return;
        }
        try{
            history_collection=await db.collection("cart");
        }
        catch(e){
             logger.error(`Error while connecting to item collection \n ${e}`);
        }
     }

    static async  getAllUnActive(){

    }
}