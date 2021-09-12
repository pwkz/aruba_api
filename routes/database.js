const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/database-controller')

router.get('/', (req, res) => {
    databaseController.getAllBuildings(req, res)
})
router.get('/building/:buildingName', (req, res) => {
    databaseController.getAllRooms(req, res)
})
router.get('/building/:buildingName/room/:roomNumber', (req, res) => {
    databaseController.getAllSocketsInTheRoom(req, res)
})
router.get('/building/:buildingName/room/:roomNumber/socketNumber/:socketNumber', (req, res) => {
    databaseController.getSocketData(req, res)
})

module.exports = router;

