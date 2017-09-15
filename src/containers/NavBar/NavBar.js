import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { auth, provider, writeUserData } from 'api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signInSuccess, signOutSuccess } from 'redux/modules/auth'
import Avatar from 'material-ui/Avatar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';

class NavBar extends Component {
  static propTypes = {
    signInSuccess: PropTypes.func.isRequired,
    signOutSuccess: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.signInSuccess(user)
      }
    });
  }

  handleSignIn = () => {
    auth.signInWithPopup(provider)
      .then((res) => {
        this.props.signInSuccess(res)
        writeUserData(res.user)
      })
  }

  handleSignOut = () => {
    auth.signOut()
      .then(() => this.props.signOutSuccess())
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title='Bero'
        iconElementRight={
          this.props.user ?
            <FlatButton
              label='Sign out'
              onClick={this.handleSignOut}
              icon={
                <Avatar
                  src={this.props.user.photoURL}
                  size={30}
                />
              }
            />
            :
            <FlatButton
              label='Sign In'
              onClick={this.handleSignIn}
            />
        }
      />
    )
  }
}


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signInSuccess, signOutSuccess }, dispatch),
})

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
