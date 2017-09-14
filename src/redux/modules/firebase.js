import { auth, provider } from 'api/firebase'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const authInitialState = {
  user: {},
  loggedIn: false,
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export function rdAuth() {
  return function (dispatch) {
    auth.signInWithPopup(provider)
      .then(res => dispatch(loginSuccess(res.user)))
      .catch(err => Error(err))
  }
}

const firebase = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      }
    default:
      return state
  }
}

export default firebase
