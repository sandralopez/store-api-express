class ProductsService {
	constructor() {
		this.products = [];
		this.generate();
	}

	generate() {
 		this.products = [{
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
		const index = this.products.findIndex((product) => product.id == productId);

		if (index === -1) {
			throw new Error('Product not found');
		}

		return this.products[index];
	}

	async update(productId, data) {
		const index = this.products.findIndex((product) => product.id == productId);
		
		if (index === -1) {
			throw new Error('Product not found');
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
			throw new Error('Product not found');
		}

		this.products.splice(index, 1);

		return productId;
	}
}

module.exports = ProductsService;