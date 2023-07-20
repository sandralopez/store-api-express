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

const categories = [
	{
		"id": 1,
		"title": "Anko",
		"description": "Filled with red bean cream"
	},
	{
		"id": 2,
		"title": "Fruits",
		"description": "Filled with fruit cream"
	},
	{
		"id": 3,
		"title": "Ice cream",
		"description": "Filled with ice cream"
	},
	{
		"id": 4,
		"title": "Cream",
		"description": "Filled with sweet cream"
	},
	{
		"id": 5,
		"title": "Nuts and seeds",
		"description": "Filled with nuts and seeds cream"
	},
];

/**
 * @swagger
 * components:
 *   schemas:
 *     NewCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Category id.
 *           example: 2
 *         title:
 *           type: string
 *           description: Category name.
 *           example: Fruits
 *         description:
 *           type: string
 *           description: Category description.
 *           example: Filled with fruit cream
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Category id.
 *           example: 2
 *         title:
 *           type: string
 *           description: Category name.
 *           example: Fruits
 *         description:
 *           type: string
 *           description: The category description.
 *           example: Filled with fruit cream
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
 *     MessageCategoryList:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message.
 *           example: Category created
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: List of categories.
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
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieve a list of product categories
 *     description: Retrieve a list of product categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
*/ 
router.get('/', (req, res) => {
	res.json(categories);
});

 /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieve a single category.
 *     description: Retrieve a single category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the category to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorNotFound'
*/
router.get('/:categoryId', (req, res) => {
	const { categoryId } = req.params;

	const category = categories.find((category) => category.id == categoryId);

	if (category === undefined) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		res.status(200).json(category);
	}
});

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MessageCategoryList'
*/
router.post('/', (req, res) => {
	const body = req.body;

    const newCategory = {
        id : body.id,
        title : body.title,
        description : body.description,
    };

    categories.push(newCategory);

	res.status(201).json({
		message: 'Category created',
		categories
	});
});

 /**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update all fields from a single category.
 *     description: Update all fields from a single category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the category to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MessageCategoryList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorNotFound'
*/
router.put('/:categoryId', (req, res) => {
	const body = req.body;
	const { categoryId } = req.params;

	const index = categories.findIndex((category) => category.id == categoryId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		const updatedCategory = {
	        id : body.id,
	        title : body.title,
	        description : body.description,
	    };

	    categories[index] = updatedCategory;

		res.status(200).json({
			message: 'Category updated',
			categories
		});
	}
});

 /**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     tags: [Categories]
 *     summary: Update some fields from a single category.
 *     description: Update some fields from a single category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the category to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MessageCategoryList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorNotFound'
*/
router.patch('/:categoryId', (req, res) => {
	const body = req.body;
	const { categoryId } = req.params;

	const index = categories.findIndex((category) => category.id == categoryId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		const toUpdate = Object.keys(body)

        toUpdate.forEach(key => {
            categories[index][key] = body[key];
        });

		res.status(200).json({
			message: 'Category updated',
			categories
		});
	}
});

 /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a single category.
 *     description: Delete a single category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the category to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MessageCategoryList'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorNotFound'
*/
router.delete('/:categoryId', (req, res) => {
	const { categoryId } = req.params;

	const index = categories.findIndex((category) => category.id == categoryId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		categories.splice(index, 1); 

		res.status(200).json({
			message: 'Category deleted',
			categories
		});
	}
});

 /**
 * @swagger
 * /categories/{id}/products:
 *   get:
 *     tags: [Categories]
 *     summary: Get products of a category
 *     description: Get products of a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the category to find the products
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of the products from given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ErrorNotFound'
*/
router.get('/:categoryId/products', (req, res) => {
	const { categoryId } = req.params;

	const index = categories.findIndex((category) => category.id == categoryId);

	if (index === -1) {
		res.status(404).json({
			message: "Not found"
		});
	} else {
		res.status(200).json(products.filter((product) => product.category == categoryId));
	}	
});

module.exports = router;