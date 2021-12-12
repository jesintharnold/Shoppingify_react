const config=require("config");
const route=require("express").Router();
const {itemcontrollerget,getcartcontroller,postcartcontroller,historycontroller,additemcontroller,deleteitemcontroller}=require("../controllers/controllerConfig");


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Get all active cart details
 *     tags:
 *      - Active Cart Details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/cart'
 *     responses:
 *       200:
 *         description: Active-cart fetch success
 *       500:
 *         description: Internal Server Error
*/

//GET - CART/ITEMS/HISTORY

route.post("/cart/active",getcartcontroller);
route.post("/cart",postcartcontroller);




route.get("/items",itemcontrollerget);
route.post("/items",additemcontroller);
route.delete("/items",deleteitemcontroller);



route.post("/history",historycontroller);


//POST - ADD ITEM
route.post("/additem",additemcontroller);


module.exports=route;