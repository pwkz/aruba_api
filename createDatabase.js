const xlsx = require('xlsx');

const filePath = process.argv.slice(2)[0];
const nazwa = process.argv.slice(3)[0];
const workbook = xlsx.readFile(filePath, {sheetStubs: true});
const worksheet = workbook.Sheets[workbook.SheetNames[2]];

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
     
class ReadXlsFile {

    neo4j = require('neo4j-driver')
    driver = this.neo4j.driver(
        'neo4j://localhost',
        this.neo4j.auth.basic('neo4j', 'mynewpass1')
    )

    constructor(buildingName) {
        this.buildingName = buildingName;
        this.rows = [];
        this.row = {};
        this.rooms = [];
        this.room = {};
        this.switches = [];
        this.switch_ = {};
        this.patchPanels = [];
        this.patchpanel = {};
    }

    async createRootNode() {
        var session = this.driver.session()
            try {
                await session.run(
                'CREATE (n:Budynek {budynek: \'' + this.buildingName + '\'})'
                )
            } finally {
                await session.close()
            }
    }

    async createConnection() {
        try {
            var session = this.driver.session()
                        await session.run(
                        "MATCH (a:Budynek), (b:Gniazdko) CREATE (a)-[r:BudynekToGniazdko]->(b) RETURN type(r)"
                        )
        } catch(e) {
            console.log(e)
        } finally {
            await session.close()
        }
    }
        async createNodes(floorName) {  
            try {
                var session = this.driver.session()
                for (const switch_ of this.switches) {
                    var rowWithThisSwitch = this.rows.filter(function(item) { return item.switch === switch_; });
                    await session.run(
                        `CREATE (n:Switch {lokalizacja: '` + floorName + `',
                        pokoj: '` + floorName + `',
                        adresip: '` + rowWithThisSwitch[0].ip + `',
                        nr_switch: '` + switch_ + `'})`)
                }
            } catch(e) {
                console.log(e)
            } finally {
                await session.close()
            }
            try {
                var session = this.driver.session()
                for (const row of this.rows) {
                    if(row.switch !== 'N') {
                        await session.run(
                            `CREATE (n:Port {port_na_switchu: '` + row.port_na_switchu + `',
                            nr_switch: '` + row.switch + `',
                            pietro: '` + row.pietro + `',
                            lokalizacja: '` + floorName + `'})`)
                    }
                }
            } catch(e) {
                console.log(e)
            } finally {
                await session.close()
            }
            try {
                var session = this.driver.session()
                await session.run(`
                    MATCH (a:Switch),
                    (b:Port)
                    WHERE a.nr_switch = b.nr_switch AND b.lokalizacja = a.lokalizacja = '` + floorName + `'
                    CREATE (a)-[r:switchToPort]->(b)
                    RETURN type(r)`
                    )
            } catch(e) {
                console.log(e)
            } finally {
                await session.close()
            }
            try {
                var session = this.driver.session()
                for (const row of this.rows) {
                    await session.run(
                        `CREATE (n:Gniazdko {nr_gniazdka: '` + row.nr_gniazdka + `',
                        pokoj: '` + row.pokoj + `',
                        pietro: '` + row.pietro + `',
                        patch_panel: '` + row.patch_panel + `',
                        nr_patch_panel: '` + row.nr_patch_panel + `',
                        lokalizacja_patch_panel: '` + row.patch_panel + `',
                        typ: '` + row.podlaczony + `',
                        pokoj: '` + row.pokoj + `'})`)    
                        await session.run(`
                        MATCH (a:Gniazdko {nr_gniazdka: '` + row.nr_gniazdka + `'}),
                        (b:Port) 
                        WHERE b.nr_switch = '` + row.switch + `' AND b.port_na_switchu = '` + row.port_na_switchu + `' AND b.pietro = a.pietro = '` + row.pietro + `'
                        CREATE (a)-[r:socketToPort]->(b)
                        RETURN type(r)`
                        )      
                    }
            } catch(e) {
                console.log(e)
            } finally {
                await session.close()
            }
        }

        async createDatabase(workbook) {
            this.createRootNode();
            for (let i = 0; i <  workbook.SheetNames.length ; i++) {
                console.log("Tworzenie bazy danych... " + (i + 1) +" z " + workbook.SheetNames.length)
                this.readCells(workbook.Sheets[workbook.SheetNames[i]])
                await this.createNodes(workbook.SheetNames[i]);
            }
            await this.createConnection();
            process.exit()
        }

        readCells(worksheet) {
            this.rows = [];
            this.switches = [];
            for (let cell in worksheet) {
                const cellAsString = cell.toString();
                if (cellAsString[0] === 'A') {
                    this.row.pietro = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'B') {
                    this.room = worksheet[cell].v;
                    this.row.pokoj = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'C') {
                    this.row.nr_gniazdka = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'D') {
                    this.row.ip = worksheet[cell].v
                }
                else if (cellAsString[0] === 'E') {
                    this.patchpanel = worksheet[cell].v;
                    this.row.patch_panel = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'F') {
                    this.row.nr_patch_panel = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'G') {
                    this.switch_ = worksheet[cell].v;
                    this.row.switch = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'H') {
                    this.row.port_na_switchu = worksheet[cell].v;
                }
                else if (cellAsString[0] === 'I') {
                    this.row.podlaczony = worksheet[cell].v;
                }
                else {
                    if(JSON.stringify(this.row) !== '{}') {
                        this.rows.push(this.row);
                    }
                    this.row = {};
                    if(JSON.stringify(this.switch_) !== '{}') {
                        this.switches.push(this.switch_);
                    }
                    this.switch_ = {};
                    this.rooms.push(this.room);
                    this.patchPanels.push(this.patchpanel);
                }
            }

            this.rows.shift()
            this.switches = this.switches.filter(onlyUnique);
            this.switches = arrayRemove(this.switches, ' ')
            this.switches = arrayRemove(this.switches, 'Switch')
            this.switches = arrayRemove(this.switches, 'N')
        }
        
}

let buildingName = process.argv.slice(3)[0];
const XlsRead = new ReadXlsFile(buildingName);
XlsRead.createDatabase(workbook)
