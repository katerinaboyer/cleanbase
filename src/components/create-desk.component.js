import React, { Component } from 'react';
import axios from 'axios';
import {Form, Col, Row} from 'react-bootstrap';

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
        axios.get('http://localhost:5000/rooms/room_type/desk_space')
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
          <div style={{marginLeft:"10.5rem", display:"block", color:"white", width:"45%"}} >
            <h3 className="h3">Create Desk:</h3>
            <Form onSubmit={this.onSubmit}>
                <Form.Group as={Row} controlId="formFloorNumbers">
                    <Form.Label column sm={3}>Room ID</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="select" onChange={this.onChangeRoomId}>
                        {
                    this.state.rooms.map(function(room) {
                      return <option 
                        key={room._id}
                        value={room._id}>{room.room_number}
                        </option>;
                    })
                  }
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAdmin">
                    <Form.Label column sm={3}>Desk Number</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="name" placeholder="" onChange={this.onChangeDeskNumber}/>
                    </Col>
                </Form.Group>

                <button className="button-submit" type="submit">
                    Create Desk
                </button>
            </Form>
          </div>
        )
      }
}