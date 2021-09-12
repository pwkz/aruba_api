const express = require('express');
const router = express.Router();
const arubaController = require('../controllers/aruba-controller')

router.get('/gniazdko/:gniazdko/adresip/:adresip', (req, res) => {
    arubaController.getData(req, res)
})
router.get('/mac/gniazdko/:gniazdko/adresip/:adresip', (req, res) => {
    arubaController.getMacTable(req, res)
})

module.exports = router;