const express=require("express");
const config=require("config");
const swaggerUi = require("swagger-ui-express");
const route=require("./routes/route");
const {swaggeroptions}=require("./utils/swagger");
const {logger}=require("./utils/logger");
const {DBclose,DBconnect}=require("./dbconfig/dbconfig");
const bodyParser = require('body-parser');
const ItemDAO=require("./dbconfig/items");
const HistoryDAO=require("./dbconfig/history");
const app=express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(route);
app.use("/shoppifydocs",swaggerUi.serve,swaggerUi.setup(swaggeroptions));
app.use((req, res) => {
    res.status(404).send('404 not found')
  });

  
DBconnect().then(async (db)=> {
    await ItemDAO.injectCol(db);
    await HistoryDAO.injectCol(db);
} ).catch(console.log);


logger.info(process.env.NODE_ENV);

app.listen(config.get('App.PORT'),()=>logger.info(`Server running on ${config.get('App.PORT')}`));

