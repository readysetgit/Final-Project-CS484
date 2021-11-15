import React, { Component } from "react";
import lightbulb from '../assets/lightbulb.svg'
import '../styles/dashboard.css'
import axios from 'axios';
import * as Auth from '../auth'
import { authenticate } from "passport";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: false,
      name: localStorage.getItem('name') || "",
      oldname: localStorage.getItem('name') || "",
      username: localStorage.getItem('username') || "",
      isEditing: false,
    };
  }

  componentDidMount() {
    axios.get('/authenticate')
    .then(res => {
        let isLoggedIn =  res.data.isLoggedIn;
        if (isLoggedIn === false) {
          this.props.history.push("/login");
        } else {
          this.setState({showPage: true})
          Auth.logIn({})
        }
    })
    .catch(err => console.log(err))
  }

  handleDoneClick = () => {
    axios.put('/update',{name: this.state.name})
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
    this.setState({ isEditing: false });
    this.setState({oldname: this.state.name})
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleDeleteClick = () => {
    if (window.confirm("For real? You sure?")) {
      // Delete account!
      axios
        .delete("/delete")
        .then((res) => {
          Auth.logOut();
          this.props.history.push("/login");
        })
        .catch((err) => console.error(err));
    }
  };

  handleLogout = () => {
    axios
      .post("/logout")
      .then((res) => {
        Auth.logOut();
        this.props.history.push("/login");
      })
      .catch((err) => console.error(err));
  };

  handleUpdateName = (e) => {
    this.setState({name: e.target.value});
    // Call the 
  }

  onCancel = () => {
    this.setState({name: this.state.oldname})
    this.setState({isEditing: false}) 
  }

  renderCurrentDetails() {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "auto",
          marginTop: 100,
          fontWeight: "bold",
          border: "1px solid #262626",
          padding: 20,
        }}
        className="current-details"
      >
        {this.state.name.length > 0 && <p>Your name is {this.state.name}</p>}
        <p>Your username is {this.state.username}</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={this.handleEditClick} className="btn btn-secondary">
            Edit Details
          </button>
          <button
            onClick={this.handleDeleteClick}
            className="btn btn-danger mts"
          >
            Delete Account
          </button>
          <button onClick={this.handleLogout} className="btn btn-danger mts">
            Logout
          </button>
        </div>
      </div>
    );
  }

  renderEditDetails() {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "auto",
          marginTop: 100,
          fontWeight: "bold",
          border: "1px solid #262626",
          padding: 20,
        }}
        className="current-details"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
              <div className="input-group mb-3">
                  <input className="form-control" value={this.state.name} onChange={this.handleUpdateName}  type="text" placeholder="username"/>
              </div>
          </div>
          <div style={{display:'flex'}}>
            <button style={{flex:1}} onClick={this.handleDoneClick} className="mrm btn btn-primary">
              Done
            </button>
            <button style={{flex:1}} onClick={this.onCancel} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="container dashboard-container">
          <h1>Welcome to your dashboard {this.state.name}! </h1>
          <div className="info-container">
            <img className="bulb" src={lightbulb} alt="lightbulb" />
            <p className="mlm">
              At the moment, you can perform some actions by clicking on one of
              the buttons below
            </p>
          </div>
        </div>
        {this.state.isEditing === false && this.renderCurrentDetails()}
        {this.state.isEditing === true && this.renderEditDetails()}
      </React.Fragment>
    );
  }
  render() {
    return (
      <React.Fragment>
        {this.state.showPage && this.renderBody()}
      </React.Fragment>
    );
  }
}
