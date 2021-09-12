import React from "react";
import Select from 'react-select';

class Selects extends React.Component {
  sendData = (socketData) => {
    this.props.parentCallback(socketData);
  }

  constructor() {
    super()
    this.state = {
      buildings: [],
      rooms: [],
      sockets: [],
      socketData: null,
      selectedBuilding: null,
      selectedRoom: null,
      selectedSocket: null
    }
  }

  handleBuildingChange = (value) => {
    this.state.selectedBuilding = value
    this.fetchRooms(value)
  }
  handleRoomChange = (value) => {
    this.state.selectedRoom = value
    this.fetchSockets(value)

  }
  handleSocketChange = (value) => {
    this.state.selectedSocket = value
    this.fetchSocketData(value)
  }

  fetchSockets = (value) => {

    const options = {}
    const url = "/database/building/d11/room/" + value.pokoj + ""
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.state.sockets = data
        this.setState(prevState => {
          let tmp = Object.assign({}, prevState);
          return { tmp };
        })
      }).catch((e) => {
        console.log(e)
      })

  }

  fetchBuildings = () => {
    const options = {}
    const url = "/database"
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.state.buildings = data
        this.setState(prevState => {
          let tmp = Object.assign({}, prevState);
          return { tmp };
        })
        console.log(this.state.buildings)
      }).catch((e) => {
        console.log(e)
      })
  }

  fetchRooms = (event) => {
    const options = {}
    const url = "/database/building/d11"
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.state.rooms = data
        this.setState(prevState => {
          let tmp = Object.assign({}, prevState);
          tmp.rooms = data;               
          return { tmp };
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  fetchSocketData = (value) => {

    const options = {}
    const url = "/database/building/" + this.state.selectedBuilding.budynek + "/room/" + this.state.selectedRoom.pokoj + "/socketNumber/" + value.nr_gniazdka + ""
    console.log(url)
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.sendData(data);
      }).catch((e) => {
        console.log(e)
      })
  }


  componentDidMount = () => {
    this.fetchBuildings()
  }

  render() {
    return (

      <div className="App">
        <form>
          <div className="dropdown-container">

            {this.state.buildings.length === 0
              ? <div>Ładowanie...</div>
              :
              <Select
                defaultValue={this.state.buildings[0].budynek}
                options={this.state.buildings}
                isClearable={false}
                onChange={this.handleBuildingChange}
                placeholder='Wybierz budynek'
                isSearchable
                name="buildings"
                getOptionLabel={(option) => option.budynek}
                getOptionValue={(option) => option.budynek}
              />
            }
          </div>
          <div className="dropdown-container">

            {this.state.rooms.length === 0
              ? null
              :
              <Select
                defaultValue={this.state.rooms[0].pokoj}
                options={this.state.rooms}
                isClearable={false}
                onChange={this.handleRoomChange}
                placeholder='Wybierz pokój'
                isSearchable
                name="rooms"
                getOptionLabel={(option) => option.pokoj}
                getOptionValue={(option) => option.pokoj}
              />
            }
          </div>
          <div className="dropdown-container">

            {this.state.sockets.length === 0
              ? null
              :
              <Select
                defaultValue={this.state.sockets[0].gniazdko}
                options={this.state.sockets}
                isClearable={false}
                placeholder='Wybierz gniazdko'
                onChange={this.handleSocketChange}
                isSearchable
                name="sockets"
                getOptionLabel={(option) => option.nr_gniazdka}
                getOptionValue={(option) => option.nr_gniazdka}
              />
            }
          </div>

        </form>
      </div>
    );
  }
}

export default Selects;
