import React, { Component } from 'react';
import logo from '../assets/HotSPOT.gif'
import { Link } from 'react-router-dom';
export default class Signup extends Component {
    render() {
        return (
            <div class="main-container">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="website logo"/>
                </div>
                <div className="login-form-container">
                    <div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" placeholder="Name (optional)"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" placeholder="username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="password" placeholder="password"/>
                        </div>
                        <button className="btn btn-primary login-btn">Sign up</button>
                    </div>
                    <div class="mt-3">
                        <p>Already have an account? <Link to="login">Login</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

