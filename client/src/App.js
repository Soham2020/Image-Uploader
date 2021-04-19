import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/SignUp';
class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container mt-4">
          {this.state.loggedIn &&
            <Home />
          }
        </div>
        {/* Routes to different components */}
        <BrowserRouter>
          <Switch>
          {/* <Route
          exact path="/"
          component={Home} /> */}
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route exact
          path="/signup"
          render={() =>
            <Signup/>}
        />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
