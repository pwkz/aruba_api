import React, { Component } from 'react';
import './App.css';
import Selects from './components/Selects.js'

class App extends Component {

  callbackFunction = (socketData) => {
    console.log(socketData)
    this.setState(socketData)
  }

  constructor() {
    super()
    this.state = []
  }


  fetchData = (value) => {
    this.fetchSockets()
    this.fetchMacTable()
  }

  fetchMacTable = (value) => {

    const url = "/aruba/mac/gniazdko/" + this.state[0].nr_gniazdka + "/adresip/" + this.state[0].adresip + ""
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(this.state)
        this.state[2] = data
        this.setState(prevState => {
          let tmp = Object.assign({}, prevState);
          tmp[2] = data
          return { tmp };
        })
        this.renderMacTable()
      }).catch((e) => {
        console.log(e)
      })

  }

  fetchSockets = (value) => {
    const url = "/aruba/gniazdko/" + this.state[0].nr_gniazdka + "/adresip/" + this.state[0].adresip + ""
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(this.state)
        this.state[1] = data
        this.setState(prevState => {
          let tmp = Object.assign({}, prevState);
          tmp[1] = data
          return { tmp };
        })
        this.renderArubaData()
      }).catch((e) => {
        console.log(e)
      })

  }

  renderMacTable() {

    if (this.state[2].message !== undefined) {

      return (<div className="article">
        <p>Błąd połączenia z Aruba</p>
      </div>)

    }
    if (this.state[2].mac_table_entry_element[0].uri === undefined) {

      return (<div className="article">
        <p>Błąd połączenia z Aruba</p>
      </div>)
    }

    return (<div className="article">
      {this.state[2].mac_table_entry_element.map((item, index) => {
        return (<div className="article">
          <table>
            <tr>
              <th>uri</th>
              <th>port_id</th>
              <th>vlan_id</th>
              <th>mac_address</th>
            </tr>
            <tr>
              <td>{item.uri}</td>
              <td>{item.port_id}</td>
              <td>{item.vlan_id}</td>
              <td>{item.mac_address}</td>
            </tr>
          </table>
        </div>)
      })}
    </div>)

  }

  renderArubaData() {

    if (this.state[1].message !== undefined) {

      return (<div className="article">
        <p>Błąd połączenia z Aruba</p>
      </div>)

    }

    if (this.state[1].uri === undefined) {

      return (<div className="article">
        <p>Błąd połączenia z Aruba</p>
      </div>)

    }
    return (
      <div className="article">
        <table>
          <tr>
            <th>uri</th>
            <th>id</th>
            <th>name</th>
            <th>is_port_enabled</th>
            <th>is_port_up</th>
            <th>config_mode</th>
          </tr>
          <tr>
            <td>{this.state[1].uri}</td>
            <td>{this.state[1].id}</td>
            <td>{this.state[1].name}</td>
            <td>{this.state[1].is_port_enabled === true ? "true" : "false "}</td>
            <td>{this.state[1].is_port_up === true ? "true" : "false "}</td>
            <td>{this.state[1].config_mode}</td>
          </tr>
        </table>
        <table>
          <tr>

            <th>trunk_mode</th>
            <th>lacp_status</th>
            <th>trunk_group</th>
            <th>is_flow_control_enabled</th>
            <th>is_dsnoop_port_trusted</th>
          </tr>
          <tr>
            <td>{this.state[1].trunk_mode}</td>
            <td>{this.state[1].lacp_status}</td>
            <td>{this.state[1].trunk_group}</td>
            <td>{this.state[1].is_flow_control_enabled === true ? "true" : "false "}</td>
            <th>{this.state[1].is_dsnoop_port_trusted === true ? "true" : "false "}</th>
          </tr>
        </table>
      </div>
    )

  }
  renderSocketData() {
    return (
      <div>
 <div className="article">
        <table>
          <tr>
            <th>Nr gniazdka</th>
            <th>Podłączono</th>
            <th>Patch Panel</th>
            <th>Nr Patch Panel</th>
            <th>Nr Switch</th>
            <th>Port Switch</th>
            <th>Adres ip</th>
          </tr>
          <tr>
            <td>{this.state[0].nr_gniazdka}</td>
            <td>{this.state[0].typ}</td>
            <td>{this.state[0].patch_panel}</td>
            <td>{this.state[0].nr_patch_panel}</td>
            <td>{this.state[0].nr_switch}</td>
            <td>{this.state[0].port_na_switchu}</td>
            <td>{this.state[0].adresip}</td>
          </tr>
        </table>
        
      </div>

<div className="btn-container">
        <button className="btn" onClick={this.fetchData}>
          Pokaż dane z Aruby
        </button>
        </div>
      </div>
     
      
    )


  }
  render() {
    return <div className="container">
      <Selects parentCallback={this.callbackFunction} />

      {this.state.length === 0
        ? null
        : this.renderSocketData()
      }

      {this.state[1] === undefined
        ? null
        : this.renderArubaData()
      }
      {this.state[2] === undefined
        ? null
        : this.renderMacTable()
      }
    </div>
  }
}

export default App;