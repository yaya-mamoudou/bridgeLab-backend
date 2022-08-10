const express = require('express');
const router = express.Router();
const { register, login } = require('@controllers/User');
const { validation } = require('@models/User');
const upload = require('@middlewares/upload');

router.post('/register', upload.single('profile'), validation.register, register);
router.post('/login', validation.login, login);

module.exports = { user: router };
