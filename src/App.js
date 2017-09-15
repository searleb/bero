import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { ThemeProvider } from 'styled-components'
import { Home } from 'pages'

import { theme } from './styled-components/theme'

const NotFound404 = () => (
  <div>
    <h1>404</h1>
    <Link to='/'>Home</Link>
  </div>
)

const Test = () => (
  <h1>Test</h1>
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
    }
  }

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/test' component={Test} />
              <Route component={NotFound404} />
            </Switch>
          </MuiThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}


export default App
