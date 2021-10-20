import React, { Component }from "react";
import "./styles/App.css";
import './styles/helpers.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { Route, Switch } from 'react-router-dom'
import axios from "axios";

class App extends Component {

  // async componentDidMount() {
  //   const data = await axios.get('/users')
  //   console.log(data)
  // }

  render() {
    return (
      <div>
              <div>
                <Switch>
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route exact path="/" component={Login} />
                </Switch>
              </div>
      </div>
    );
  }
}

export default App;