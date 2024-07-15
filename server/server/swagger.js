const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    
        openapi: "3.0.0",
        info: {
          title: "Support Tickets Api",
          version: "0.1.0",
          description:
            "This is an API application made with Express for the backend server of Support Tickets website"
        },
        servers: [
          {
            url: "http://localhost:3001",
          },
        ],

};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./server/routes/*.js", "./server/index.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
