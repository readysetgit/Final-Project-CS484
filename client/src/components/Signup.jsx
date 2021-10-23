import React, { Component } from 'react';
import logo from '../assets/HotSPOT.gif'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isValidPassword } from '../passwordValidator'
export default class Signup extends Component {
    state = {
        showPage: false,
        name:'',
        username:'',
        password:''
    }

    componentDidMount() {
        axios.get('/authenticate')
        .then(res => {
            let isLoggedIn =  res.data.isLoggedIn;
            if (isLoggedIn === true) {
              this.props.history.push("/dashboard");
            } else {
              this.setState({showPage: true})
            }
        })
        .catch(err => console.log(err))
    }

    handleSignup = () => {
        let validPassword = isValidPassword(this.state.password)

        if(validPassword === true){
            axios.post('/signup', {username: this.state.username, password: this.state.password, name: this.state.name})
             .then(res => {
                 if (res.error) {
                     alert(res.error)
                     return;
                 }
                this.props.history.push('/login')                 
             }).catch(err => {
                 alert(err.response.data.error)
             })
        }
        else{
            console.error('Password is required to have 1 uppercase, 1 number, 1 symbol and at least have 8 characters')
            alert('Password is required to have 1 uppercase, 1 number, 1 symbol and at least have 8 characters')
        }
    }
    
    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
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
                            <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name (optional)"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="username"/>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
                        </div>
                        <button onClick={this.handleSignup} className="btn btn-primary login-btn">Sign up</button>
                    </div>
                    <div className="mt-3">
                        <p>Already have an account? <Link to="login">Login</Link></p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (this.state.showPage === true && this.renderBody())
    }
}

