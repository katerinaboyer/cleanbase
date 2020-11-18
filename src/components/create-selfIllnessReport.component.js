import React, { Component } from 'react';
import axios from 'axios';
import * as emailjs from "emailjs-com";
import DatePicker from "react-datepicker";
import { connect, useSelector } from "react-redux";
import { getUser } from "../store/selectors";
import ToastMessage from './toast.component';

const CreateReport = (props) => {
  const user = useSelector(getUser);
  return <CreateSelfIllnessReport currUser={user} />;
};

export class CreateSelfIllnessReport extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeReport = this.onChangeReport.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      email: props.currUser.email,
      name: props.currUser.name,
      userID: props.currUser._id,
      phone: '',
      date: Date.now(),
      report: '',
      emails: [],
      attendIds:[],
      show_error: false,
      nonDupeEmails:[],
    };
  }

  componentDidMount() { //12096e5 is two weeks in miliseconds, a nessary magic number
    axios
      .all([ //This gets the most recent reservation for the currently logged in user
        axios.get('http://localhost:5000/reservations/userId/' + this.state.userID)
      ])
      .then(([resResponse]) => {
        var date = new Date();
        var dateAdjusted = new Date(Date.now() - 12096e5);
        console.log(this.state.userID);
        console.log(resResponse);
        for(var j = 0; j < resResponse.data.length; j++){
          date = new Date(resResponse.data[j].date) //date from the current reservation
          if(date.getDate() >= dateAdjusted.getDate()){
            
            for(var i = 0; i < resResponse.data[j].attendees.length; i++){
              axios
              .all([
                //from each attendee, we extract their email and place it into an array
                axios.get('http://localhost:5000/users/id/' + resResponse.data[j].attendees[i])
              ])
              .then(([userResponse]) => {
                console.log(this.state.userID);
              if(userResponse.data.email != null){
                var test = this.state.emails.concat(userResponse.data.email);
                this.setState({
                  emails: test
                });
                console.log(this.state.emails);
              }
              });
            }//attend for loop end line 50
      }
      }// 2 weeks back forloop end
    });
  }



  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeReport(e) {
    this.setState({
      report: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();
    var emailDupes = this.state.emails
    var noDupes = emailDupes.filter((c,index) => {
      return emailDupes.indexOf(c) === index;
    });

    if (
      this.state.email &&
      this.state.name &&
      this.state.phone &&
      this.state.date &&
      this.state.report
    ) {
      const newselfIllnessReport = {
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        date: this.state.date,
        report: this.state.report
      }

      console.log(newselfIllnessReport);
      console.log(this.state.email);

      var data = {
        to_email: this.state.emails,
        from_name: this.state.name
      };

      emailjs.send("service_lsurk9p", "template_87jsa8q", data, "user_YLt0CRcKLOhVbiTOfPMjp").then(
        function (response) {
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
        }
      )

      console.log(newselfIllnessReport);
      console.log(this.state.email);
      var data = {
        to_email: this.state.email,
        from_name: this.state.name
      };

      emailjs.send("service_lsurk9p", "template_87jsa8q", data, "user_YLt0CRcKLOhVbiTOfPMjp").then(
        function (response) {
          console.log(response.status, response.text);
        },
        function (err) {
          console.log(err);
        }
      );

      axios
        .all([
          axios.get("http://localhost:5000/rooms"),
          axios.get("http://localhost:5000/desks"),
          axios.get("http://localhost:5000/users/all"),
        ])
        .then(([roomResponse, deskResponse, userResponse]) => {
          this.setState({
            rooms: roomResponse.data.map((room) => room),
            room_number: roomResponse.data[0],
            desks: deskResponse.data.map((desk) => desk),
            desk_number: deskResponse.data[0],
            all_users: userResponse.data.map((user) => user)
          });
        });

      axios.post('http://localhost:5000/selfIllnessReport/add', newselfIllnessReport)
        .then(res => console.log(res.data));
      this.props.history.push('/')
    } else {
      this.setState({
        show_error: true
      });
      setTimeout(() => {this.setState({
        show_error: false
      })}, 5000);
    }
  }

  render() {
    return (
      <div>
        <h3>Create Self Illness Report</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.phone}
                onChange={this.onChangePhone}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <input  type="date"

                className="form-control"
                value={this.state.date}
                onChange={this.onChangeDate}
                />
          </div>
          <div className="form-group">
            <label>Report: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.report}
                onChange={this.onChangeReport}
                />
          </div>


          <div className="form-group">
            <input type="submit" value="Create Self Illness Report" className="button-submit" />
          </div>
        </form>
        <ToastMessage show={this.state.show_error} text={"Opps, it looks like you didn't fill out the form."} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CreateReport);
