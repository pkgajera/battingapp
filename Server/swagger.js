// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json'; // Output file for the generated Swagger documentation
const endpointsFiles = ['./routes/*.js']; // Paths to your route files

const doc = {
    info: {
        title: 'Batting App',
        description: 'API documentation',
    },
    host: 'localhost:3001', // Change to your host
    schemes: ['http', 'https'],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            name: "authorization",
            in: "header",
        }
    },
    security: [{
        BearerAuth: []
    }],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // Path to your main server file
});
