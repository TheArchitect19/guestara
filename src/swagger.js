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
  apis: ['src/routes/category.routes.js', 'src/routes/items.routes.js','src/routes/subcategory.routes.js'],
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;
