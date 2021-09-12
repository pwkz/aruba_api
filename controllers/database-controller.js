const DatabaseModel = require('../models/database-model')

exports.getAllRooms = async (req, res) => { 
        var rooms = await DatabaseModel.getAllRooms(req.params.buildingName)
        res.json(rooms)
}

exports.getAllSocketsInTheRoom = async (req, res) => { 
        var sockets = await DatabaseModel.getAllSocketsInTheRoom(req.params.buildingName, req.params.roomNumber)
        res.json(sockets)
}

exports.getAllBuildings = async (req, res) => { 
        var buildings = await DatabaseModel.getAllBuildings()
        res.json(buildings)
}

exports.getSocketData = async (req, res) => {         
        var socketData = await DatabaseModel.getSocketData(req.params.buildingName, req.params.roomNumber, req.params.socketNumber)
        var dataToSend = []

        if(socketData[0].typ === 'INT') {
                dataToSend =[{
                        nr_gniazdka: socketData[0].nr_gniazdka,
                        typ: 'Internet',
                        patch_panel: socketData[0].patch_panel,
                        nr_patch_panel: socketData[0].nr_patch_panel,
                        nr_switch: socketData[0].nr_switch,
                        adresip: socketData[0].adresip,
                        port_na_switchu: socketData[0].port_na_switchu,
                }]
        } else if(socketData[0].typ === 'TEL') {
                dataToSend =[{
                        nr_gniazdka: socketData[0].nr_gniazdka,
                        typ: 'Telefon',
                        patch_panel: socketData[0].patch_panel,
                        nr_patch_panel: socketData[0].nr_patch_panel,
                        nr_switch: 'Brak',
                        adresip: 'Brak',
                        port_na_switchu: 'Brak',
                }]
        } else {
                dataToSend =[{
                        nr_gniazdka: socketData[0].nr_gniazdka,
                        typ: 'Brak podłączenia',
                        patch_panel: socketData[0].patch_panel,
                        nr_patch_panel: socketData[0].nr_patch_panel,
                        nr_switch: 'Brak',
                        adresip: 'Brak',
                        port_na_switchu: 'Brak',
                }]
        }
        res.json(dataToSend)
}
