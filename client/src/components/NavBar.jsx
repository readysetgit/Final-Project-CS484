import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar-custom">
                <Link className="link" to="/dashboard">Dashboard</Link>
                <Link className="link" to="/login">Login</Link>
      </nav>
    );
  }
}

export default NavBar;
