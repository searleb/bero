/**
 * Bootstrap App here
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import store from './redux/store'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

const rootElem = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElem
)

if (module.hot) {
  console.log('Going hot 🔥') // eslint-disable-line
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default

    ReactDOM.render(
      <NextApp />,
      rootElem
    )
  })
}

registerServiceWorker()
