const Joi = require('joi');

const id = Joi.number().positive();
const title = Joi.string().alphanum().min(3).max(15);
const description = Joi.string().alphanum().min(3).max(255);

const createCategorySchema = Joi.object({
	title: title.required(),
	description: description.required(),
});

const updateCategorySchema = Joi.object({
	id: id.required(),
	title: title,
	description: description,
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };