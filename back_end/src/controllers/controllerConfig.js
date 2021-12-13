const ItemDAO=require("../dbconfig/items");
const HistoryDAO=require("../dbconfig/history");
const {getAllItemSchema,addItemSchema,deleteItemSchema,historyCartSchema}=require("../../schema_validators/ItemSchems");
const Joi=require('joi');
const {logger}=require('../utils/logger');

/** 
*@swagger
* components:
*  schemas:
*   cart:
*     type: object
*     required:
*       - userID
*     properties:
*       userID:
*         type: string
*         description: provide user-id
*/


const getcartcontroller=async (req,res,next)=>{
    let {error,value}=historyCartSchema.validate(req.body);
    logger.info(req.body);
     if(value.userID!==undefined){
         let response=await HistoryDAO.getActiveCart(value.userID);
         res.status(200).json(response);        
     }else{
      res.status(500).json({Err:`Internal Server Error`});
     }
}


const postcartcontroller=async (req,res,next)=>{

}


/** 
*@swagger
* components:
*  schemas:
*   items:
*     type: object
*     required:
*       - userID
*     properties:
*       userID:
*         type: string
*         description: provide user-id to fetch all items
*/


const itemcontrollerget=async (req,res,next)=>{

    let {error,value}=getAllItemSchema.validate(req.body);
    logger.info(req.body);
    logger.info(`Joi - Validation ${value.userID}`);


    if(value!==undefined){
      let data=await ItemDAO.allitems();
      res.status(200).json({
          Items:data
      })
    }else{
        res.status(500).json({Err:`Internal Server Error`});
    }

}


/** 
*@swagger
* components:
*  schemas:
*   historyitems:
*     type: object
*     required:
*       - userID
*     properties:
*       userID:
*         type: string
*         description: provide user-id
*/


const historycontroller=async (req,res,next)=>{
   let {error,value}=historyCartSchema.validate(req.body);
   logger.info(req.body);
    if(value.userID!==undefined){
        let response=await HistoryDAO.getCartHistory(value.userID);
        res.status(200).json(response);        
    }else{
     res.status(500).json({Err:`Internal Server Error`});
    }
}


// POST controllers


/** 
*@swagger
* components:
*  schemas:
*   additems:
*     type: object
*     required:
*       - userID
*       - name
*       - category
*     properties:
*       userID:
*         type: string
*         description: Provide userID
*       name:
*         type: string
*         description: Provide ItemName
*       note:
*         type: string
*         description: Provide Note
*       category:
*         type: string
*         description: Provide category Name
*       imageURL:
*         type: string
*         description: Provide category ImageURL
*/


const additemcontroller=async (req,res,next)=>{
    let {error,value}=addItemSchema.validate(req.body);
    logger.info(req.body);
    if(value.name!==undefined&&value.category!==undefined){
        let response=await ItemDAO.updateItem(value.category,value.userID,value.name,value.note,value.imageURL);
        res.status(201).json(response);        
    }else{
     res.status(500).json({Err:`Internal Server Error`});
    }
}



/** 
*@swagger
* components:
*  schemas:
*   deleteitem:
*     type: object
*     required:
*       - userID
*       - categoryID
*       - itemID
*     properties:
*       userID:
*         type: string
*         description: Provide userID
*       categoryID:
*         type: string
*         description: Provide categoryID
*       itemID:
*         type: string
*         description: Provide itemID
*/

const deleteitemcontroller=async (req,res,next)=>{
    let {error,value}=deleteItemSchema.validate(req.body);
    logger.info(req.body);
    if(value.categoryID&&value.userID&&value.itemID){
        let  del_res=await ItemDAO.deleteItem(value.userID,value.categoryID,value.itemID);
        if(del_res){
            res.status(200).json({Request_status:`Successful`});
        }
    }else{
        res.status(500).json({Err:`Internal Server Error`});
    }
}




module.exports={
    itemcontrollerget,
    historycontroller,
    additemcontroller,
    deleteitemcontroller,
    getcartcontroller,
    postcartcontroller
};