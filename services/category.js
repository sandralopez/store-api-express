class CategoriesService {
	constructor() {
		this.categories = [];
		this.products = [];
		this.generate();
	}

	generate() {
 		this.categories = [{
				"id": 1,
				"name": "Anko",
				"description": "Filled with red bean cream"
			},
			{
				"id": 2,
				"name": "Fruits",
				"description": "Filled with fruit cream"
			},
			{
				"id": 3,
				"name": "Ice cream",
				"description": "Filled with ice cream"
			},
			{
				"id": 4,
				"name": "Cream",
				"description": "Filled with sweet cream"
			},
			{
				"id": 5,
				"name": "Nuts and seeds",
				"description": "Filled with nuts and seeds cream"
			},
		];

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
	    const newCategory = {
	        id : data.id, 
	        ...data
	    };

	    this.categories.push(newCategory);

	    return newCategory;
	}

	async find() {
		return this.categories;
	}

	async findOne(categoryId) {
		const category = this.categories.find((category) => category.id == categoryId);

		if (!category) {
			throw new Error('Category not found');
		}

		return category;
	}

	async update(categoryId, data) {
		const index = this.categories.findIndex((category) => category.id == categoryId);
		
		if (index === -1) {
			throw new Error('Category not found');
		}

		const category = this.categories[index];

		this.categories[index] = {
			...category,
			...data
		};

		return this.categories[index];
	}

	async delete(categoryId) {
		const index = this.categories.findIndex((category) => category.id == categoryId);
		
		if (index === -1) {
			throw new Error('Category not found');
		}

		this.categories.splice(index, 1);

		return categoryId;
	}

	async findProducts(categoryId) {
		const index = this.categories.findIndex((category) => category.id == categoryId);
		
		if (index === -1) {
			throw new Error('Category not found');
		}

		return this.products.filter((product) => product.category == categoryId);
	}
}

module.exports = CategoriesService;