const config=require("config");
const route=require("express").Router();
const {itemcontrollerget,cartcontroller,historycontroller,additemcontroller,deleteitemcontroller}=require("../controllers/controllerConfig");


//GET - CART/ITEMS/HISTORY

route.get("/cart",cartcontroller);

route.get("/items",itemcontrollerget);
route.post("/items",additemcontroller);
route.delete("/items",deleteitemcontroller);

route.get("/history",historycontroller);


//POST - ADD ITEM
route.post("/additem",additemcontroller);


module.exports=route;