import React, { Component } from 'react';
import logo from '../assets/HotSPOT.gif';
import '../styles/Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Auth from '../auth'
export default class Login extends Component {
    username = React.createRef();

    constructor(props) {
        super(props);

        this.state = {username: '', password: '', showPage: false};
    }

    componentDidMount() {
        axios.get('/authenticate')
        .then(res => {
            let isLoggedIn =  res.data.isLoggedIn;
            if (isLoggedIn === true) {
              this.props.history.push("/dashboard");
            } else {
              this.setState({showPage: true})
              this.username.current.focus();
            }
        })
        .catch(err => console.log(err))
        
    }

    handleLogin = async () => {
        axios.post('/login', {username: this.state.username, password: this.state.password})
             .then(res => { 
                 console.log(res.data); 
                 Auth.logIn(res.data.username, res.data.name)
                 this.props.history.push("/dashboard");
             }).catch(err => { 
                 console.error(err);
                 alert('Incorrect username or password')
             })
    }

    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }


    renderBody() {
        return (
            <div className="main-container">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="website logo"/>
                </div>
                <div className="login-form-container">
                    <div>
                        <div className="input-group mb-3">
                            <input ref={this.username} className="form-control" value={this.state.username} onChange={this.onUsernameChange}  type="text" placeholder="username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" value={this.state.password} onChange={this.onPasswordChange} type="password" placeholder="password"/>
                        </div>
                        <button onClick={this.handleLogin} className="btn btn-primary login-btn">Login</button>
                    </div>
                    <div className="mt-3">
                        <p>Don't have an account? <Link to="signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (this.state.showPage === true && this.renderBody())
    }
}
