import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Login } from 'containers'
import { theme } from './styled-components/theme'

const NotFound404 = () => (
  <div>
    <h1>404</h1>
    <Link to='/'>Home</Link>
  </div>
)

const Home = () => (
  <div>
    <Link to='/login'>Login</Link>
    <h1>Home</h1>
  </div>
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
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route component={NotFound404} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}


export default App
