const ItemDAO=require("../dbconfig/items");
const {getAllItemSchema,addItemSchema,deleteItemSchema}=require("../../schema_validators/ItemSchems");
const Joi=require('joi');
const {logger}=require('../../utils/logger');
const cartcontroller=async (req,res,next)=>{
    
}

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

const historycontroller=async (req,res,next)=>{
   
}


// POST controllers

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
    cartcontroller,
    itemcontrollerget,
    historycontroller,
    additemcontroller,
    deleteitemcontroller
};