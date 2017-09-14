import React, { Component } from 'react'
import { auth, provider, redirectIfLoggedIn } from 'api/firebase'

class Login extends Component {
  componentDidMount() {
    redirectIfLoggedIn()
  }

  handleLogin = () => {
    auth.signInWithPopup(provider)
      .then(() => { window.location = '/' })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {auth.currentUser.displayName && `${auth.currentUser.displayName}, you are logged in`} 
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default Login
