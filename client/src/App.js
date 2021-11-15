import React, { Component }from "react";
import "./styles/App.css";
import './styles/helpers.css'
import Login from './components/Login'
import Signup from './components/Signup'
// import Dashboard from './components/Dashboard'
import { Route, Switch } from 'react-router-dom'
// import Home2 from './components/Home2'
import Home from "./components/Home";
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Home}/>
            <Route exact path="/" component={Login}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;