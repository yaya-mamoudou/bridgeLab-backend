const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check, param } = require('express-validator');

const Category = new Schema(
	{
		name: String,
		description: String,
		image: String,
	},
	{ timestamps: true }
);

const validation = {
	create: [
		check('name').notEmpty().withMessage('name is required'),
		check('description').notEmpty().withMessage('description is required'),
	],
	update: [
		param('id')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The provided id is not a valid id'),
	],
	delete: [
		param('id')
			.custom((id) => mongoose.Types.ObjectId.isValid(id))
			.withMessage('The provided id is not a valid id'),
	],
};

module.exports = { Category: model('category', Category), validation };
