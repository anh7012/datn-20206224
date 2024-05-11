const express = require('express');
const router = express.Router();

const hosoController = require('../controllers/hosoController')

router.get('/', hosoController.list)

module.exports = router