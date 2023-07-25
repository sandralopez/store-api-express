const Joi = require('joi');

const id = Joi.number().positive();
const name = Joi.string().alphanum().min(3).max(15);
const description = Joi.string().alphanum().min(3).max(255);

const createCategorySchema = Joi.object({
	name: name.required(),
	description: description.required(),
});

const updateCategorySchema = Joi.object({
	id: id.required(),
	name: name,
	description: description,
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };