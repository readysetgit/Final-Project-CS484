import React, { Component, useEffect  }from "react";
import "./styles/App.css";
import './styles/helpers.css'
import Login from './components/Login'
import Signup from './components/Signup'
// import Dashboard from './components/Dashboard'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
// import Home2 from './components/Home2'
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import axios from 'axios';
import * as Auth from './auth'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPage: false,
      name: localStorage.getItem('name') || "",
      oldname: localStorage.getItem('name') || "",
      username: localStorage.getItem('username') || "",
      isEditing: false,
      locations: []
    };
  }

  componentDidMount() {
    axios.get('/authenticate')
    .then(res => {
        let isLoggedIn =  res.data.isLoggedIn;
        if (isLoggedIn === false) {
          this.props.history.push("/login");
        } else {
          //console.log(res)
          this.setState({showPage: true, name: res.data.name, username: res.data.username})
          Auth.logIn(res.data.username, res.data.name)
          this.handleGetLocations()
          this.props.history.push("/dashboard");
        }
    })
    .catch(err => console.log(err))
  }

  handleUserDelete = () => {
    if (window.confirm("For real? You sure?")) {
      // Delete account!
      axios
        .delete("/delete")
        .then((res) => {
          Auth.logOut();
          this.setState({showPage: false})
          this.onLoggedOut()
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
        this.onLoggedOut()
        this.props.history.push("/login");
      })
      .catch((err) => console.error(err));
  };

  onLoggedin = () => {
    this.handleGetLocations()
    this.setState({showPage: true, username: localStorage.getItem('username'), name: localStorage.getItem('name')})
    this.props.history.push("/dashboard");
  }

  onLoggedOut = () => {
    this.setState({showPage: false})
  }

  handleGetLocations = () => {
    axios.get("/getlocations").then((res) => {
      this.setState({locations:res.data})
      console.log(res.data)
    })
    .catch((err) => console.error(err));
  }

  handleAddLocation = (params) => {
    axios
    .post("/addlocation", params)
    .then((res) => {
      console.log(res)
      this.setState({locations: [...this.state.locations, res.data]})
    })
    .catch((err) => console.error(err));
  }

  handlePlaceDelete = (location_id) => {
    axios
    .delete("/deletelocation", {location_id: location_id})
    .then((res) => {
      console.log(res)
      let newlocations = this.state.locations;
      let delete_index = newlocations.findIndex(x => x.location_id === location_id)
      newlocations.splice(delete_index, 1);
      this.setState({locations: newlocations})
    })
    .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        { this.state.showPage === true && <NavBar name={this.state.name ? this.state.name : this.state.username} handleUserDelete={this.handleUserDelete} handleLogout={this.handleLogout}/> }
        <div>
          <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={() => (<Login onLoggedin={this.onLoggedin} />)}/>
            <Route path="/dashboard" component={ () => (<Home locations={this.state.locations} handleAddLocation={this.handleAddLocation} handlePlaceDelete={this.handlePlaceDelete}/>)}/>
            <Route exact path="/" component={Login}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);