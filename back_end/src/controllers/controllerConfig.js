const ItemDAO=require("../dbconfig/items");
const HistoryDAO=require("../dbconfig/history");
const {getAllItemSchema,addItemSchema,deleteItemSchema,historyCartSchema,postCartSchema}=require("../../schema_validators/ItemSchems");
const {logger}=require('../utils/logger');
const {ObjectId}=require("mongodb");


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
    if(error){
        res.status(500).json({Err:`Internal Server Error`});
    };
     if(value.userID!==undefined){
         let response=await HistoryDAO.getActiveCart(value.userID);
         if(response===500){
            res.status(500).json({Err:`Internal Server Error`});
        }
         res.status(200).json({cart:response});        
     }else{
      res.status(500).json({Err:`Validation - data missing`});
     }
}

/** 
*@swagger
* components:
*  schemas:
*   postcart:
*     type: object
*     required:
*       - userID
*       - listName
*       - status
*       - status
*       - items
*     properties:
*       userID:
*         type: string
*         description: Provide userID
*       listName:
*         type: string
*         description: Provide list name
*       status:
*         type: string
*         description: Provide Status (completed | In-progress | Cancelled) 
*       cartID:
*         type: string
*         description: Provide category cartID
*       items:
*         type: object
*         description: Please provide Items
*/

const postcartcontroller=async (req,res,next)=>{
    let {value,error}=postCartSchema.validate(req.body);
    if(error){
        res.status(500).json({Err:`Internal Server Error`});
    };
    if(value.userID!==undefined&&value.items!==undefined){
        
        
        let _res=await HistoryDAO.postActiveCart(value.cartID,value.userID,value.listName,value.items,value.status);
        
        if(_res===500){
            res.status(500).json({Err:`Internal Server Error`});
        }
        
        if(_res.modifiedCount===1){
            res.status(202).json({status:`Success`});
        }else if(_res.insertedId!==null){
            res.status(202).json({status:`Success`,cartID:_res.insertedId});
        }
        else{
            res.status(400).json({status:`Failed`});
        }
    }else{
        res.status(500).json({Err:`Validation - data missing`});
    }


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
    if(error){
        
        res.status(500).json({Err:`Internal Server Error`});
    };
    if(value.userID!==undefined){  
      let data=await ItemDAO.allitems(value.userID);
      if(data===500){
        res.status(500).json({Err:`Internal Server Error`});
      };
      res.status(200).json({
         Item:data
      })
    }else{
        res.status(500).json({Err:`Validation - data missing`});
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
   if(error){
    res.status(500).json({Err:`Internal Server Error`});
};
    if(value.userID!==undefined){
        let response=await HistoryDAO.getCartHistory(value.userID);
        if(response===500){
            res.status(500).json({Err:`Internal Server Error`});
          }
        res.status(200).json({Cart:response});        
    }else{
     res.status(500).json({Err:`Validation - data missing`});
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
*       - categoryID
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
*       categoryID:
*         type: string
*         description: Provide category CategoryID if exist
*/


const additemcontroller=async (req,res,next)=>{
    let {error,value}=addItemSchema.validate(req.body);
    if(error){
        res.status(500).json({Err:`Internal Server Error`});
    };

    if(value.name!==undefined&&value.category!==undefined){
        let response=await ItemDAO.updateItem(value.category,value.userID,value.name,value.note,value.imageURL,value.categoryID);
        if(response===500){
            res.status(500).json({Err:`Internal Server Error`});
        }
        res.status(201).json(response);        
    }else{
     res.status(500).json({Err:`Validation - data missing`});
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

    if(error){
        res.status(500).json({Err:`Internal Server Error`});
    };

    if(value.categoryID&&value.userID&&value.itemID){
        let  del_res=await ItemDAO.deleteItem(value.userID,value.categoryID,value.itemID);
        if(del_res===500){
            res.status(500).json({Err:`Internal Server Error`});
          };
        if(del_res){
            logger.info(del_res);
            res.status(200).json({Request_status:`Success`});
        };
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