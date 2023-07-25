const express = require('express');

const CategoriesService = require('./../services/category');
const validatorHandler = require('./../middlewares/validation-handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category');

const router = express.Router();
const service = new CategoriesService();

/**
 * @swagger
 * components:
 *   schemas:
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
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Not Allowed
 *     BoomError:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           description: Error Status Code.
 *           example: 400
 *         error:
 *           type: string
 *           description: Error message.
 *           example: Bad Request
 *         message:
 *           type: string
 *           description: Error detail.
 *           example: name is required
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
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/ 
router.get('/', async (req, res) => {
	const categories = await service.find();

	res.status(200).json(categories);
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
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.get('/:categoryId', 
    validatorHandler(getCategorySchema, 'params'),
    async (req, res) => {
	const { categoryId } = req.params;

	try {
		const category = await service.findOne(categoryId);

		res.status(200).json(category);
	}
	catch (error) {
        next(error);
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.post('/', 
    validatorHandler(createCategorySchema, 'body'),
    async (req, res) => {
	const body = req.body;
	const category = await service.create(body);

	res.status(201).json(category);
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
 *               $ref: '#/components/schemas/Cateogory'
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.put('/:categoryId', 
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res) => {
	const body = req.body;
	const { categoryId } = req.params;

	try {
		const category = await service.update(categoryId, body);

		res.status(200).json(category);
	}
	catch (error) {
		next(error);
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
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.patch('/:categoryId', 
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res) => {
	const body = req.body;
	const { categoryId } = req.params;

	try {
		const category = await service.update(categoryId, body);

		res.status(200).json(category);
	}
	catch (error) {
		next(error);
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
 *               type: integer
 *       404:
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.delete('/:categoryId', 
    validatorHandler(getCategorySchema, 'params'),
    async (req, res) => {
	const { categoryId } = req.params;

	try {
		const id = await service.delete(categoryId);

		res.status(200).json(id);
	} 
	catch (error) {
		next(error);
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
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       400:
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/BoomError'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/Error'
*/
router.get('/:categoryId/products', 
    validatorHandler(getCategorySchema, 'params'),
    async (req, res) => {
	const { categoryId } = req.params;

	try {
		const products = await service.findProducts(categoryId);

		res.status(200).json(products);
	}
	catch (error) {
		next(error);
	}
});

module.exports = router;