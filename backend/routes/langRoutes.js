const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');

router.get('/:lang', langController.getLanguagePack);

module.exports = router;