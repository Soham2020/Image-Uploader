import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            passwprd: '',
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
        console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault();

        axios.post('/register', {
            username: this.state.username,
			password: this.state.password
        })
        .then(response => {
            console.log(response)
            if (!response.data.errmsg) {
                console.log('successful signup')
                this.setState({ //redirect to login page
                    redirectTo: '/login'
                })
            } else {
                console.log('username already taken')
            }
        }).catch(error => {
            console.log('signup error: ')
            console.log(error)

        })
    }
    render() {
        return (
            <>
                <div className="signup">
                    <Form className="login-form">
                    <h1 className="text-center font-weight-bold">Signup Form</h1>
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
                        <button className="btn-lg btn-success btn-block"
						onClick={this.handleSubmit}
						type="submit">Submit</button><br/>
                        <Link to="/login">Login</Link>
                    </Form>
                </div>
            </>
        )
    }
}

export default SignUp;