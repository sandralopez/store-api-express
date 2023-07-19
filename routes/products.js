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

router.get('/', (req, res) => {
	const { search } = req.query;
	
	if (search) {
		res.json(products.filter(product => product.description.toLowerCase().includes(search.toLowerCase())));
	} else {
		res.json(products);
	}
});

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
