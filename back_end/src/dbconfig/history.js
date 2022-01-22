const {logger}=require("../utils/logger");
const {ObjectId}=require("mongodb");
const { valid, object } = require("joi");
let history_collection;

class HistoryDAO{
    static async injectCol(db){
        if(history_collection){
            return;
        }
        try{
            history_collection=await db.collection("cart");
            logger.info("History collection connected");
        }
        catch(e){
             logger.error(`Error while connecting to item collection \n ${e}`);
        }
     }

    static async  getCartHistory(user_ID){

      const pipeline=[
        { $match:{"Active_list":false,"User_ID":ObjectId(user_ID)}},
        {$unwind:"$items"},
        {
         $lookup:{
              from: "items",
             let:{
                 cat_ID:"$items.category_ID",
                 itm_ID:"$items.Item_ID"
                 },
             pipeline:[
            {$match:{ "$expr": { "$eq": [ "$_id", "$$cat_ID" ]}}},
            {$project: {
                    "name":1,"Items":1,"_id":0,
                firstElem: {$first:{
                  $filter:{
             input:"$Items",
             as:"itemname",
             cond:{$eq: ["$$itm_ID","$$itemname.Itm_id"]}
                    }
                    }}}}    
          ],
             as: "address"
          }
        },
       {
        $project:{
         items:1,status:1,
         User_ID:1,DOC:1,Active_list:1,ListName:1,
        "address":{ "$arrayElemAt": [ "$address", 0 ] }
        } 
        },
        {
        $group:{
        _id:"$_id",
        user_ID:{$first:"$User_ID"},
        status:{$first:"$status"},
        DOC:{$first:"$DOC"},
        ListName:{$first:"$ListName"},
        category_ID:{$first:"$items.category_ID"},   
        categoryname:{$first:"$address.name"},
        items:{
        $push:{
        ItemName:"$address.firstElem.name",
        checked:"$items.checked",
        quantity:"$items.quantity",
        Item_ID:"$items.Item_ID"
        }} 
        }
        }
      ]; 

      try{
        let cart_history=await history_collection.aggregate(pipeline).sort({"DOC":-1}).toArray();
        return cart_history;

      }catch(e){
        logger.error(`Unable to Cart History items - ${e}`);
        return 500;
      }
    }

    static async  getActiveCart(user_ID){

        const pipeline=[
          { $match:{"Active_list":true,"User_ID":ObjectId(user_ID)}},
          {$unwind:"$items"},
          {
           $lookup:{
                from: "items",
               let:{
                   cat_ID:"$items.category_ID",
                   itm_ID:"$items.Item_ID"
                   },
               pipeline:[
              {$match:{ "$expr": { "$eq": [ "$_id", "$$cat_ID" ]}}},
              {$project: {
                      "name":1,"Items":1,"_id":0,
                  firstElem: {$first:{
                    $filter:{
               input:"$Items",
               as:"itemname",
               cond:{$eq: ["$$itm_ID","$$itemname.Itm_id"]}
                      }
                      }}}}    
            ],
               as: "address"
            }
          },
         {
          $project:{
           items:1,status:1,
           User_ID:1,DOC:1,Active_list:1,ListName:1,
          "address":{ "$arrayElemAt": [ "$address", 0 ] }
          } 
          },
          {
          $group:{
          _id:"$_id",
          user_ID:{$first:"$User_ID"},
          status:{$first:"$status"},
          DOC:{$first:"$DOC"},
          ListName:{$first:"$ListName"},
          
          items:{
          $push:{
          category_ID:"$items.category_ID",   
          categoryname:"$address.name",  
          ItemName:"$address.firstElem.name",
          checked:"$items.checked",
          quantity:"$items.quantity",
          Item_ID:"$items.Item_ID"
          }} 
          }
          }
        ]; 
  
        try{
          let cart_history=await history_collection.aggregate(pipeline).limit(1).toArray();
          return cart_history;
  
        }catch(e){
          logger.error(`Unable to Cart Active Cart items - ${e}`);
          return 500;
        }
      }

    static async postActiveCart(cartID,userID,listName,items,status){
    
      let _items=items.map(dat=>Object.assign({},dat,{category_ID:ObjectId(dat.category_ID),Item_ID:ObjectId(dat.Item_ID)}));

      try{
        await history_collection.updateMany({"User_ID":ObjectId(userID)},{$set:{Active_list:false}});
      
      if(cartID){
         
         logger.warn(`ObjectID changing started \n`);
         
         let _res=await history_collection.updateOne(
           {"User_ID":ObjectId(userID),"_id":ObjectId(cartID)},
           {
             $set:{
              ListName:listName,
              Active_list:true,
              status:status,
              items:_items
             }
           }
          
          );
          return _res;
      }else{
         let _res=await history_collection.insertOne({
          listName :listName,
          status : status,
          User_ID :ObjectId(userID),
          items : _items,
          Active_list:true
         });
         _res.modifiedCount=0;
         return _res;
      }

      }catch(e){
        logger.error(`Db Error - ${e}`);
        return 500;
      }
    }  
}


module.exports=HistoryDAO;