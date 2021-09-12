const express = require('express');
const router = express.Router();
const arubaController = require('../controllers/aruba-controller')

router.get('/', (req, res) => {
	arubaController.handleLogin(req, res)
	console.log(req.session.cookie);
})

module.exports = router;
