const fetch = require('node-fetch');

class ArubaModel {

    static async arubaLoginAndReturnCookie() {
        const response = await fetch('http://172.30.110.122/rest/v7/login-sessions', {
            method: 'post',
            body: process.env.ARUBA_LOGIN,
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await response.json();
        return await json;
    }

    static async arubaLogout(seesioncookie) {
        const response = await fetch('http://172.30.110.122/rest/v7/login-sessions', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'cookie': objectValue['cookie']
            },
        })
        const json = await response.json();
        return await json;
    }

    static async arubaGetPortData(ipAddress, socket, cookie) {

        // var socketUrl = socket.replace("-", "/");
        // var url = "http://" + ipAddress + "/rest/v7/ports/" + socketUrl
        // console.log(url)
        // const response = await fetch(url, { 
        //     headers: {
        //         'cookie': cookie
        //     }
        // })
        // const json = await response.json();
        // return await json;

        return { "uri": "/ports/1/16", "id": "1/16", "name": "", "is_port_enabled": true, "is_port_up": false, "config_mode": "PCM_AUTO", "trunk_mode": "PTT_NONE", "lacp_status": "LAS_DISABLED", "trunk_group": "", "is_flow_control_enabled": false, "is_dsnoop_port_trusted": false }
    }

    static async arubaGetMacTable(ipAddress, socket, cookie) {
        // var socketUrl = socket.replace("-", "/");
        // var url = "http://" + ipAddress + "/rest/v7/ports/" + socketUrl + "/mac-table"
        // console.log(url)
        // const response = await fetch(url, { 
        //     headers: {
        //         'cookie': cookie
        //     }
        // })
        // const json = await response.json();
        // return await json;
        return { "collection_result": { "total_elements_count": 3, "filtered_elements_count": 3 }, "mac_table_entry_element": [{ "uri": "/ports/3/A1/mac-table/8c85c1-59558e", "mac_address": "8c85c1-59558e", "port_id": "3/A1", "vlan_id": 1 }, { "uri": "/ports/3/A1/mac-table/8c85c1-595580", "mac_address": "8c85c1-595580", "port_id": "3/A1", "vlan_id": 1 }, { "uri": "/ports/3/A1/mac-table/b4ada3-b26cb4", "mac_address": "b4ada3-b26cb4", "port_id": "3/A1", "vlan_id": 928 }] }
    }
}

module.exports = ArubaModel;


