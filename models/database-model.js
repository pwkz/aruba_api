var neo4j = require('neo4j-driver')
var driver = neo4j.driver(
    process.env.DB_URL,
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS)
)

class DatabaseModel {

    static async getSocketData(building, room, socketNumber) {

        var session = driver.session()
        var socketData = []
        try {

            await session.run(
                `MATCH (budynek:Budynek {budynek: '` + building + `'})--(gniazdko:Gniazdko {nr_gniazdka: '` + socketNumber + `', pokoj: '` + room + `'}) OPTIONAL MATCH ((gniazdko)--(port:Port)--(switch:Switch))
                 RETURN gniazdko.nr_gniazdka, gniazdko.typ, gniazdko.patch_panel, gniazdko.nr_patch_panel, switch.nr_switch, switch.adresip, port.port_na_switchu`
            )
                .then(function (result) {
                    result.records.forEach(function (record) {
                        socketData.push({
                            nr_gniazdka: record._fields[0],
                            typ: record._fields[1],
                            patch_panel: record._fields[2],
                            nr_patch_panel: record._fields[3],
                            nr_switch: record._fields[4],
                            adresip: record._fields[5],
                            port_na_switchu: record._fields[6]
                        })
                    });
                })
        } catch (e) {
            console.log(e)
            return await { message: "Wystąpił błąd z bazą danych" };
        } finally {
            await session.close()
            return socketData;

        }
    }

    static async getAllRooms(building) {
        var session = driver.session()
        var rooms = []
        try {

            await session.run(
                `MATCH (budynek:Budynek {budynek: '` + building + `'})--(n:Gniazdko) RETURN DISTINCT n.pokoj`
            )
                .then(function (result) {
                    result.records.forEach(function (record) {
                        rooms.push({
                            pokoj: record._fields[0]
                        })
                    });
                })
        } catch (e) {
            console.log(e)
            return await { message: "Wystąpił błąd z bazą danych" };
        } finally {
            await session.close()
            return rooms;
        }
    }

    static async getAllBuildings() {
        var session = driver.session()
        var rooms = []
        try {

            await session.run(
                'MATCH (n:Budynek) RETURN DISTINCT n.budynek'
            )
                .then(function (result) {
                    result.records.forEach(function (record) {
                        rooms.push({
                            budynek: record._fields[0]
                        })
                    });
                })
        } catch (e) {
            console.log(e)
            return await { message: "Wystąpił błąd z bazą danych" };
        } finally {
            await session.close()
            return rooms;
        }
    }

    static async getAllSocketsInTheRoom(buildingName, roomNumber) {
        var session = driver.session()
        var sockets = []
        try {

            await session.run(
                `MATCH (budynek:Budynek {budynek: '` + buildingName + `'})--(n: Gniazdko {pokoj: "` + roomNumber + `"}) RETURN n.nr_gniazdka`
            )
                .then(function (result) {
                    result.records.forEach(function (record) {
                        sockets.push({
                            nr_gniazdka: record._fields[0]
                        })
                    });
                })
        } catch (e) {
            console.log(e)
            return await { message: "Wystąpił błąd z bazą danych" };
        } finally {
            await session.close()
            return sockets;

        }
    }
}

module.exports = DatabaseModel;


