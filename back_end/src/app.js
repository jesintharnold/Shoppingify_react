const express=require("express");
const config=require("config");
const route=require("./routes/route");
const {logger}=require("../utils/logger");
const {DBclose,DBconnect}=require("./dbconfig/dbconfig");
const bodyParser = require('body-parser')
const ItemDAO=require("./dbconfig/items");
const app=express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(route);

DBconnect().then(async (db)=> {
    await ItemDAO.injectCol(db);
    
} ).catch(console.log);


logger.info(process.env.NODE_ENV);

app.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));

