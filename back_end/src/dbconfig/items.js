const {logger}=require("../utils/logger");
const {ObjectId}=require("mongodb");
let item_collection;
class ItemDAO{
    static async injectCol(db){
       if(item_collection){
           return
       }
       try{
           item_collection=await db.collection("items");
           logger.info("Items collection connected");
       }
       catch(e){
            logger.error(`Error while connecting to item collection \n ${e}`);
       }
    }

    static async allitems(User_ID){
        try{
            return await item_collection.find({"User_ID" :ObjectId(User_ID)}).toArray();
        }
        catch(e){
            logger.error(`Unable to fetch All items - ${e}`);
            return 500;
        }
    }

    static async updateItem(cat_name,User_ID,Itm_name,note,imageURL,cat_ID){

        try{

            if(cat_ID){
            let dup_res=await item_collection.find({"User_ID" :ObjectId(User_ID),"_id":ObjectId(cat_ID),'Items.name':{'$eq':Itm_name}}).toArray().length;
            logger.error(typeof dup_res);
            let add_upsert_item=await item_collection.findOneAndUpdate(
                    {"User_ID" :ObjectId(User_ID),name:cat_name,'Items.name':{'$ne':Itm_name}},
                    {
                    $addToSet:{Items:{name:Itm_name,Itm_id:new ObjectId(),note:note,imageURL:imageURL}}
                    },
                    {upsert:false}
                    );   
            return add_upsert_item;

            }else{
                let add_upsert_item=await item_collection.findOneAndUpdate(
                    {"User_ID" :ObjectId(User_ID),name:cat_name,'Items.name':{'$ne':Itm_name}},
                    {
                    $addToSet:{Items:{name:Itm_name,Itm_id:new ObjectId(),note:note,imageURL:imageURL}}
                    },
                    {upsert:true,new:true}
                    );
                return add_upsert_item; 
            }
        }
        catch(e){
            logger.error({Err:`Unable to Update item - ${e}`});
            return 500;
        }
    }

    static async deleteItem(User_ID,category_ID,itemID){
        try{
            let del_response= await item_collection.find({"User_ID":ObjectId(User_ID),"_id":ObjectId(category_ID)}).toArray();
            if(del_response[0].Items.length>1){
                let {modifiedCount}=await item_collection.updateOne(
                    {"User_ID":ObjectId(User_ID),"_id":ObjectId(category_ID)},
                    {$pull:{Items:{"Itm_id" :ObjectId(itemID)}}}
                );
                logger.info(`Deleted from Existing Doc - ${modifiedCount}`);
                return modifiedCount;
            }
            else{
                logger.info(`Entering Whole delete`);
                let {deletedCount}=await item_collection.deleteOne({"User_ID":ObjectId(User_ID),"_id":ObjectId(category_ID)});
                return deletedCount;
            }

        }catch(e){
            logger.error({Err:`Unable to delete item - ${e}`});
            return 500;
        }
    }
}

module.exports=ItemDAO;