import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Style.css';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log('login response: ')
            console.log(response)
            if (response.status === 200) {
                // update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                // update the state to redirect to home
                this.setState({
                    redirectTo: '/home'
                })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
            
        })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        return (
            <>
            
                <>
                    <Form className="login-form">
                    <h1 className="text-center font-weight-bold">Login</h1>
                        <FormGroup>
                            <Label >Email</Label>
                            <Input type="email" name="username"
							value={this.state.username}
							onChange={this.handleChange} id="username" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange} />
                        </FormGroup>
                        <button className="btn-lg btn-primary btn-block"
						onClick={this.handleSubmit}
						type="submit">Login</button><br/>
                        <Link to="/signup" >Signup</Link>
                    </Form>
                </>
            </>
        )
    }
}

export default Login;