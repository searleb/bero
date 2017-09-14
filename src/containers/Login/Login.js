import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { rdAuth } from 'redux/modules/firebase'


class Login extends Component {
  componentDidMount() {
    console.log(this.props.loggedIn)
    // if (!this.state.user) {
    //   auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       this.setState({ user });
    //     }
    //   })
    // }
  }

  handleLogin = () => {
    this.props.rdAuth()
  }

  render() {
    return (
      this.props.loggedIn ?
        <Redirect push to='/' />
        :
        <button onClick={this.handleLogin}>Login</button>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({
  user: firebase.user,
  loggedIn: firebase.loggedIn,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ rdAuth }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
