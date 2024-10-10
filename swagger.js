const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Seat Booking API',
      version: '1.0.0',
      description: 'API documentation for the seat booking application',
    },
    servers: [
      {
        url: 'http://localhost:3006', // Thay đổi URL này khi bạn triển khai
      },
    ],
  },
  apis: ['./routes/*.js'], // Chỉ định đường dẫn đến các tệp chứa API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
