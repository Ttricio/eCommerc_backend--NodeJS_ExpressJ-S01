const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');


const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);

//Connection to database
mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		console.log(`--------------------------------`);
		console.log('Database connection is ready(:)(:)');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(3000, () => {
	console.log(api);
	console.log(`server is running on http://localhost:3000`);
});
