import React, { Component } from 'react';
import logo from '../assets/HotSPOT.gif';
import '../styles/Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Login extends Component {
    username = React.createRef();

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    componentDidMount() {
        this.username.current.focus();
    }

    handleLogin = async () => {
        let data = await (await axios.post('/auth/login', {username: this.state.username})).data
        console.log(data)
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div class="main-container">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="website logo"/>
                </div>
                <div className="login-form-container">
                    <div>
                        <div className="input-group mb-3">
                            <input ref={this.username} className="form-control" value={this.state.username} onChange={this.onUsernameChange}  type="text" placeholder="username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" value={this.state.password} type="password" placeholder="password"/>
                        </div>
                        <button onClick={this.handleLogin} className="btn btn-primary login-btn">Login</button>
                    </div>
                    <div class="mt-3">
                        <p>Don't have an account? <Link to="signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}
