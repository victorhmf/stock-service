import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'API SERVICE',
    description: 'Api service which asks for quote information'
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'Operations related to users'
    },
    {
      name: 'Stocks',
      description: 'Operations related to stocks'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/interfaces/routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);