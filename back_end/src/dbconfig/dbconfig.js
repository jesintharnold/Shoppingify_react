const mongoDB=require("mongodb");
const config=require("config");
const {logger}=require("../utils/logger");

let connected=false;
const DBconnect= async ()=>{

return new Promise((resolve,reject)=>{

  let db;
  let mongoClient;

  try{
    mongoDB.MongoClient.connect(config.get('dbConfig.conn_string'),{ useNewUrlParser: true },function(err,client){
      
      if(err){
        logger.error(`DB connection failes \n`,err);
        reject(err);
       }

       mongoClient=client;
       db=mongoClient.db(config.get("dbConfig.db_name"));
      
       logger.info(`Initating Connection .... ${mongoClient.topology.isConnected()?'Established':'Revoked'}`);
      
       resolve(db);

       process.on('exit',()=>{
               DBclose();
       });

});
  }
  catch(e){
     reject(err);
  };
})
    
}


const DBclose=()=>{
  if(mongoClient && mongoClient.topology.isConnected()){
      logger.info(`MongoDB connection Closed...`);
      mongoClient.close();
  }
}




module.exports={
    DBconnect,
    DBclose
}