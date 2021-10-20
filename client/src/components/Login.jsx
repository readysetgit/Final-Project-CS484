import React, { Component } from 'react';
import logo from '../assets/HotSPOT.gif';
import '../styles/Login.css'
import { Link } from 'react-router-dom';
export default class Login extends Component {
    render() {
        return (
            <div class="main-container">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="website logo"/>
                </div>
                <div className="login-form-container">
                    <div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" placeholder="username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="password" placeholder="password"/>
                        </div>
                        <button className="btn btn-primary login-btn">Login</button>
                    </div>
                    <div class="mt-3">
                        <p>Don't have an account? <Link to="signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}
