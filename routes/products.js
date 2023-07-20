const express = require('express');

const router = express.Router();

const products = [
	{
		"id": 1,
		"title": "Strawberry mochi",
		"price": 250,
		"description": "Mochi filled with strawberry cream",
		"category": 2,
		"image": "/images/mochi_1.jpeg"
	},
	{
		"id": 2,
		"title": "Matcha mochi",
		"price": 300,
		"description": "Mochi filled with matcha tea cream",
		"category": 3,
		"image" : "/images/mochi_2.jpeg"
	},
	{
		"id": 3,
		"title": "Sesame mochi",
		"price": 300,
		"description": "Mochi filled with sesame cream",
		"category": 6,
		"image" : "/images/mochi_3.jpeg"
	},
	{
		"id": 4,
		"title": "Chocolate mochi",
		"price": 250,
		"description": "Mochi filled with chocolate cream",
		"category": 4,
		"image": "/images/mochi_4.jpeg"
	},
	{
		"id": 5,
		"title": "Mango mochi",
		"price": 300,
		"description": "Mochi filled with mango cream",
		"category": 2,
		"image" : "/images/mochi_5.jpeg"
	},
	{
		"id": 6,
		"title": "White Chocolate mochi",
		"price": 350,
		"description": "Mochi filled with white chocolate cream",
		"category": 4,
		"image" : "/images/mochi_6.jpeg"
	}
];

/**
 * @swagger
 * components:
 *   schemas:
 *     NewProduct:
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
 *     MessageProductList:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message.
 *           example: Product created
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *           description: List of products.
 *     ErrorNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Not found
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
router.get('/', (req, res) => {
	const { search } = req.query;
	
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
 *               $ref: '#components/schemas/ErrorNotFound'
*/
router.get('/:productId', (req, res) => {
	const { productId } = req.params;

	const result = products.find((product) => product.id == productId);

	if (result === undefined) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		res.status(200).json(result);
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
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MessageProductList'
*/
router.post('/', (req, res) => {
	const body = req.body;

    const newProduct = {
        id : body.id,
        title : body.title,
        price : body.price,
        description : body.description,
        category : body.category, 
        image : body.image
    };

    products.push(newProduct);

	res.status(201).json({
		message: 'Product created',
		products
	});
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
 *               $ref: '#/components/schemas/MessageProductList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '/components/schemas/ErrorNotFound'
*/
router.put('/:productId', (req, res) => {
	const body = req.body;
	const { productId } = req.params;

	const index = products.findIndex((product) => product.id == productId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		const updatedProduct = {
	        id : body.id,
	        title : body.title,
	        price : body.price,
	        description : body.description,
	        category : body.category, 
	        image : body.image
	    };

	    products[index] = updatedProduct;

		res.status(200).json({
			message: 'Product updated',
			products
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
 *               $ref: '#/components/schemas/MessageProductList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '/components/schemas/ErrorNotFound'
*/
router.patch('/:productId', (req, res) => {
	const body = req.body;
	const { productId } = req.params;

	const index = products.findIndex((product) => product.id == productId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		const toUpdate = Object.keys(body)

        toUpdate.forEach(key => {
            products[index][key] = body[key];
        });

		res.status(200).json({
			message: 'Product updated',
			products
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
 *               type: object
 *               $ref: '#/components/schemas/MessageProductList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '/components/schemas/ErrorNotFound'
*/
router.delete('/:productId', (req, res) => {
	const { productId } = req.params;

	const index = products.findIndex((product) => product.id == productId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		products.splice(index, 1); 

		res.status(200).json({
			message: 'Product deleted',
			products
		});
	}
});



module.exports = router;
