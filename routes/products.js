const express = require('express');

const ProductsService = require('./../services/product');

const router = express.Router();
const service = new ProductsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Product id.
 *           example: 2
 *         title:
 *           type: string
 *           description: Prodyct name.
 *           example: Matcha mochi
 *         price:
 *           type: integer
 *           description: Product price
 *           example: 250
 *         description:
 *           type: string
 *           description: The product description.
 *           example: Mochi filled with strawberry cream
 *         category:
 *           type: integer
 *           description: Category id of the product
 *           example: 2
 *         image:
 *           type: string
 *           description: URL of the product image
 *           example: /images/mochi_1.jpeg
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Product not found
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
*/ 
router.get('/', async (req, res) => {
	const { search } = req.query;

	const products = await service.find();
	
	if (search) {
		res.status(200).json(products.filter(product => product.description.toLowerCase().includes(search.toLowerCase())));
	} else {
		res.status(200).json(products);
	}
});

 /**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve a single product.
 *     description: Retrieve a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.get('/:productId', async (req, res) => {
	const { productId } = req.params;

	try {
		const product = await service.findOne(productId);

		res.status(200).json(product);
	}
	catch (error) {
		res.status(404).json({
			message: error.message
		});
	}
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
*/
router.post('/', async (req, res) => {
	const body = req.body;
	const product = await service.create(body);

	res.status(201).json(product);
});

 /**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update all fields from a single product.
 *     description: Update all fields from a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
*/
router.put('/:productId', async (req, res) => {
	const body = req.body;
	const { productId } = req.params;

	try {
		const product = await service.update(productId, body);

		res.status(200).json(product);
	}
	catch (error) {
		res.status(404).json({
			message: error.message
		});
	}
});

 /**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags: [Products]
 *     summary: Update some fields from a single product.
 *     description: Update some fields from a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
*/
router.patch('/:productId', async (req, res) => {
	const body = req.body;
	const { productId } = req.params;
	
	try {
		const product = await service.update(productId, body);

		res.status(200).json(product);
	}
	catch (error) {
		res.status(404).json({
			message: error.message
		});
	}
});

 /**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a single product.
 *     description: Delete a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
*/
router.delete('/:productId', async (req, res) => {
	const { productId } = req.params;

	try {
		const id = await service.delete(productId);

		res.status(200).json(id);
	} 
	catch (error) {
		res.status(404).json({
			message: error.message
		});
	}
});



module.exports = router;
