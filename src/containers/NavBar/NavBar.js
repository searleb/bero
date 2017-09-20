import React, { Component } from 'react'
import { RippleOverlay } from 'components'
import PropTypes from 'prop-types'
import { auth, provider, writeUserData } from 'api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signInSuccess, signOutSuccess } from 'redux/modules/auth'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'

const TriggerWrapper = styled.div`
  transform: translate(1.5em, -1.5em);
  bottom: 0;
  z-index: 100;
  display: inline-block;
`

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
    auth.getRedirectResult().then((result) => {
      if (result) {
        this.props.signInSuccess(result.user)
        writeUserData(result.user)
      }
    }).catch((error) => {
      Error(error)
    })
  }

  handleSignIn = () => {
    auth.signInWithRedirect(provider)
  }

  handleSignOut = () => {
    auth.signOut()
      .then(() => this.props.signOutSuccess())
  }

  render() {
    return (
      <RippleOverlay
        trigger={
          <TriggerWrapper>
            <FloatingActionButton>
              <Menu />
            </FloatingActionButton>
          </TriggerWrapper>
        }
      >
        {this.props.user ?
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
      </RippleOverlay>
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
