import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Guestara',
      version: '1.0.0',
      description: 'A simple Express API application documented with Swagger',
    },
  },
  apis: ['api/routes/category.routes.js', 'api/routes/items.routes.js','api/routes/subcategory.routes.js'],
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;
