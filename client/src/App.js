import React from "react";
import "./App.css";
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from "./components/NavBar";

// import { Dashboard } from './components/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      <NavBar />
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