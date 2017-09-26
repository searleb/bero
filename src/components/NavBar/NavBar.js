import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import styled from 'styled-components'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import {
  SearchBox,
  SignInSignOut,
  SaveLocation,
  MyPlaces,
} from 'containers'

const TriggerWrapper = styled.div`
  transform: translate(1.5em, -1.5em);
  bottom: 0;
  z-index: 100;
  display: inline-block;
  position: absolute;
`

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={290}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar
            title='Bero'
            showMenuIconButton={false}
            iconElementRight={<SignInSignOut />}
          />
          <MenuItem>
            <SearchBox placeholder='Where are we going?' />
          </MenuItem>

          <MenuItem>
            <SaveLocation />
          </MenuItem>

          <MenuItem>
            <MyPlaces />
          </MenuItem>

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

export default NavBar
