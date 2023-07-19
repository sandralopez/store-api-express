const express = require('express');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/products', productsRouter);
	router.use('/categories', categoriesRouter);
}

module.exports = routerApi;