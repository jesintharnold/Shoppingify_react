const config=require("config");
const route=require("express").Router();
const {itemcontrollerget,getcartcontroller,postcartcontroller,historycontroller,additemcontroller,deleteitemcontroller}=require("../controllers/controllerConfig");
const {googleoauth}=require('../controllers/googleOauthController');
const checkauth=require('../middleware/protected-routes');


//route.use(Headers);

/**
 * @swagger
 * /cart:
 *   get:
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

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Change or Insert new Active Cart
 *     tags:
 *      - Change Active Cart Details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postcart'
 *     responses:
 *       202:
 *         description: Active Cart Modified Successfully
 *       500:
 *         description: Internal Server Error
*/

route.get("/cart",checkauth,getcartcontroller);
route.post("/cart",checkauth,postcartcontroller);


/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items 
 *     tags:
 *      - All Item Details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/items'
 *     responses:
 *       200:
 *         description: Items fetch success
 *       500:
 *         description: Internal Server Error
*/


/**
 * @swagger
 * /items:
 *   post:
 *     summary: Add a new item 
 *     tags:
 *      - Add a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/additems'
 *     responses:
 *       201:
 *         description: Add Item to list
 *       500:
 *         description: Internal Server Error
*/

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: delete a  item 
 *     tags:
 *      - Delete a  item 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/deleteitem'
 *     responses:
 *       200:
 *         description: Delete item from list
 *       500:
 *         description: Internal Server Error
*/

route.get("/items",checkauth,itemcontrollerget);
route.post("/items",checkauth,additemcontroller);
route.delete("/items",checkauth,deleteitemcontroller);



/**
 * @swagger
 * /history:
 *   get:
 *     summary: History List 
 *     tags:
 *      - History List  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/historyitems'
 *     responses:
 *       200:
 *         description: History List 
 *       500:
 *         description: Internal Server Error
*/

route.get("/history",checkauth,historycontroller);


//Google Oauth handlers

route.get("/api/sessions/oauth/google",googleoauth);




module.exports=route;