const express = require('express');
const router = express.Router();
const { validation } = require('@models/Category');
const { create } = require('@controllers/Category');
const upload = require('@middlewares/upload');

router.post('/file-upload', upload.single('image'), validation.create, create);

module.exports = { fileUpload: router };
