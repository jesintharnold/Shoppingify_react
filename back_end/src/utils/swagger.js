const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition:{
      openapi: "3.0.0",
      info: {
        title: "Shoppingify API challenge by devchallenges.io",
        version:"0.1.0",
        description:"API built for Shoppingify challenge by devChallenges.io",
      }
    },
    apis:['./src/routes/route.js','./src/controllers/controllerConfig.js']
};
  
exports.swaggeroptions=swaggerJsdoc(options);