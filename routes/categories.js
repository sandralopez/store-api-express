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

router.get('/', (req, res) => {
	res.json(categories);
});

router.get('/:categoryId', (req, res) => {
	const { categoryId } = req.params;

	res.json(categories.find((category) => category.id == categoryId));
});

router.get('/:categoryId/products', (req, res) => {
	const { categoryId } = req.params;

	res.json(products.find((product) => product.category == categoryId));
});

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

module.exports = router;