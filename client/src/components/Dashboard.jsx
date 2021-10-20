import React, { Component } from "react";
import lightbulb from '../assets/lightbulb.svg'
import '../styles/dashboard.css'
export default class Dashboard extends Component {
  state = {
    name: 'Diyin',
    userName: 'diyin123',
    password: '12345678',
    isEditing: false
  };

  handleDoneClick = () => {
    this.setState({isEditing: false})
  }

  handleEditClick = () => {
    this.setState({isEditing: true})
  }

  handleDeleteClick = () => {
    if (window.confirm('For real? You sure?')) {
      // Delete account!
      console.log('The account was deleted');
    } else {
      // Do nothing!
    }
  }

  renderCurrentDetails() {
    return (
      <div style={ {maxWidth: 400, margin: 'auto', marginTop: 100, fontWeight: 'bold', border: '1px solid #262626', padding: 20} } className="current-details">
        {this.state.name.length > 0 && <p>Your name is Diyin</p>}
        <p>Your username is {this.state.userName}</p>
        <div style={{display:'flex', flexDirection:'column'}}>
          <button onClick={this.handleEditClick} className="btn btn-secondary" >Edit Details</button>
          <button onClick={this.handleDeleteClick} className="btn btn-danger mts" >Delete Account</button>
        </div>
      </div>
    )
  }

  renderEditDetails() {
    return (
      <div style={ {maxWidth: 400, margin: 'auto', marginTop: 100, fontWeight: 'bold', border: '1px solid #262626', padding: 20} } className="current-details">
        <div style={{display:'flex', flexDirection:'column'}}>
          <button onClick={this.handleDoneClick} className="btn btn-primary">Done</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="container dashboard-container">
          <h1>Welcome to your dashboard {this.state.name}! </h1>
          <div className="info-container">
            <img className="bulb" src={lightbulb} alt="lightbulb"/>
            <p className="mlm">At the moment, you can perform some actions by clicking on one of the buttons below</p>
          </div>
        </div>
        { this.state.isEditing === false && this.renderCurrentDetails() }
        { this.state.isEditing === true && this.renderEditDetails() }

      </React.Fragment>
    );
  }
}
