import React from "react";
import "./styles/App.css";
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from "./components/NavBar";

import { Route, Switch } from 'react-router-dom'

function App() {
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

export default App;