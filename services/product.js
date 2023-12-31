const boom = require('@hapi/boom');

class ProductsService {
	constructor() {
		this.products = [];
		this.generate();
	}

	generate() {
 		this.products = [{
				"id": 1,
				"name": "Strawberry mochi",
				"price": 250,
				"description": "Mochi filled with strawberry cream",
				"category": 2,
				"image": "/images/mochi_1.jpeg"
			},
			{
				"id": 2,
				"name": "Matcha mochi",
				"price": 300,
				"description": "Mochi filled with matcha tea cream",
				"category": 3,
				"image" : "/images/mochi_2.jpeg"
			},
			{
				"id": 3,
				"name": "Sesame mochi",
				"price": 300,
				"description": "Mochi filled with sesame cream",
				"category": 6,
				"image" : "/images/mochi_3.jpeg"
			},
			{
				"id": 4,
				"name": "Chocolate mochi",
				"price": 250,
				"description": "Mochi filled with chocolate cream",
				"category": 4,
				"image": "/images/mochi_4.jpeg"
			},
			{
				"id": 5,
				"name": "Mango mochi",
				"price": 300,
				"description": "Mochi filled with mango cream",
				"category": 2,
				"image" : "/images/mochi_5.jpeg"
			},
			{
				"id": 6,
				"name": "White Chocolate mochi",
				"price": 350,
				"description": "Mochi filled with white chocolate cream",
				"category": 4,
				"image" : "/images/mochi_6.jpeg"
			}
		];
	}

	async create(data) {
	    const newProduct = {
	        id : data.id, // GENERAR DE FORMA RANDOM
	        ...data
	    };

	    this.products.push(newProduct);

	    return newProduct;
	}

	async find() {
		return this.products;
	}

	async findOne(productId) {
		const product = this.products.find((product) => product.id == productId);

		if (!product) {
			throw boom.notFound('Product not found');
		}

		return product;
	}

	async update(productId, data) {
		const index = this.products.findIndex((product) => product.id == productId);
		
		if (index === -1) {
			throw boom.notFound('Product not found');
		}

		const product = this.products[index];

		this.products[index] = {
			...product,
			...data
		};

		return this.products[index];
	}

	async delete(productId) {
		const index = this.products.findIndex((product) => product.id == productId);
		
		if (index === -1) {
			throw boom.notFound('Product not found');
		}

		this.products.splice(index, 1);

		return productId;
	}
}

module.exports = ProductsService;