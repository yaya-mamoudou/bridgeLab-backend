require('dotenv').config();
require('module-alias/register');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { PORT } = require('@config/config');
const connectDb = require('@db/connection');
const { category, user, fileUpload } = require('@routes/');
const doc = require('@api_doc/swagger');

const port = PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', user);
app.use('/api/v1/category', category);
app.use('/api/v1/file', fileUpload);

app.use('/', swaggerUi.serve, swaggerUi.setup(doc));

(async () => {
	try {
		await connectDb();
		app.listen(port, console.log(`Server running on PORT http://localhost:${port}`));
	} catch (error) {
		console.log(error);
	}
})();
