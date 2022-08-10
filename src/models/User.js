const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { check } = require('express-validator');

const User = new Schema({
	username: String,
	email: String,
	password: String,
	profile: String,
	token: String,
});

const validation = {
	register: [
		check('username').notEmpty().withMessage('username is required'),
		check('password')
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6 })
			.withMessage('password must be minimum 6 characters'),
		check('email')
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Enter a valid email'),
	],
	login: [
		check('email')
			.notEmpty()
			.withMessage('email is required')
			.isEmail()
			.withMessage('Enter a valid email'),
		check('password')
			.notEmpty()
			.withMessage('password is required')
			.isLength({ min: 6 })
			.withMessage('password length must be a least 6 characters'),
	],
};

module.exports = { User: model('user', User), validation };
