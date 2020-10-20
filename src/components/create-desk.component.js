import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDesk extends Component {
    constructor(props) {
        super(props);

        this.onChangeDeskNumber = this.onChangeDeskNumber.bind(this);
        this.onChangeRoomId = this.onChangeRoomId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            desk_number: '',
            room_id: '',
            rooms: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/rooms/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                      rooms: response.data.map(room => room),
                  })
              }
          })
          .catch((error) => {
              console.log(error);
          })
    }

    onChangeDeskNumber(e) {
        this.setState({
            desk_number: e.target.value
        })
    }

    onChangeRoomId(e) {
        this.setState({
            room_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newDesk = {
            desk_number: this.state.desk_number,
            room_id: this.state.room_id,
        }

        console.log(newDesk);

        axios.post('http://localhost:5000/desks/add', newDesk)
            .then(res => console.log(res.data));
    }

    render() {
        return (
          <div>
            <h3>Create New Desk</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Room Id: </label>
              <select ref="roomInput"
                  required
                  className="form-control"
                  value={this.state.room_id}
                  onChange={this.onChangeRoomId}>
                  {
                    this.state.rooms.map(function(room) {
                      return <option 
                        key={room._id}
                        value={room._id}>{room.room_number}
                        </option>;
                    })
                  }
              </select>
            </div>
              <div className="form-group"> 
                <label>Desk Number: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.desk_number}
                    onChange={this.onChangeDeskNumber}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create Desk" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
}