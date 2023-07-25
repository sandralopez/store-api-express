const Joi = require('joi');

const id = Joi.number().positive();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(3).max(255);
const price = Joi.number().integer().min(10);
const category = Joi.number().integer().min(1);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
	name: name.required(),
	description: description.required(),
	price: price.required(),
	category: category.required(),
	image: image.required(),
});

const updateProductSchema = Joi.object({
	id: id.required(),
	name: name,
	description: description,
	price: price,
	category: category,
	image: image,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };