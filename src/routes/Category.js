const express = require('express');
const router = express.Router();
const { validation } = require('@models/Category');
const { create, update, get, del } = require('@controllers/Category');
const upload = require('@middlewares/upload');
const { auth } = require('@middlewares/auth');
router.post('/create', upload.single('image'), validation.create, create);

router.put('/update/:id', upload.single('image'), validation.update, update);

router.delete('/delete/:id', auth, validation.delete, del);

router.get('/all', get);

module.exports = { category: router };
