const swaggerJsDoc = require('swagger-jsdoc');
const { PORT } = require('@config/config');
const swaggerDefinition = {
	info: {
		version: '3.0.0',
		title: 'Bridge labs Api',
		description: 'Bridge labs Onboarding task api doc',
	},
	swagger: '2.0',
	contact: {
		name: 'Yaya Mamoudou',
		email: 'yayamamoudou0@gmail.com',
	},
	// host: `localhost:${PORT}`,
	host: 'bridgelab-api.herokuapp.com',
	basePath: '/',
	schemes: ['https'],
	consumes: ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'],
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			scheme: 'bearer',
			in: 'header',
		},
	},
	produces: ['application/json'],
	paths: {},
};

const swaggerSpec = swaggerJsDoc({ swaggerDefinition, apis: ['./src/api_doc/*/*.js'] });

module.exports = swaggerSpec;
