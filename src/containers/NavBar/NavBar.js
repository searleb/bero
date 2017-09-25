import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { auth, provider, writeUserData } from 'api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signInSuccess, signOutSuccess } from 'redux/modules/auth'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'

const TriggerWrapper = styled.div`
transform: translate(1.5em, -1.5em);
bottom: 0;
z-index: 100;
display: inline-block;
position: absolute;
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

  constructor(props) {
    super(props);
    this.state = { open: false }
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

  handleSignIn = () => auth.signInWithRedirect(provider)

  handleSignOut = () => auth.signOut().then(() => this.props.signOutSuccess())

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={260}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar title='Bero' showMenuIconButton={false} />
          <MenuItem>
            {this.props.user ?
              <FlatButton
                label='Sign out'
                onClick={this.handleSignOut}
                fullWidth
                primary
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
                fullWidth
                primary
              />
            }
          </MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <TriggerWrapper>
          <FloatingActionButton onClick={this.handleToggle}>
            <Menu />
          </FloatingActionButton>
        </TriggerWrapper>
      </div>
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
