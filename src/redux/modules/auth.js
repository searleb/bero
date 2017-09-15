const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

export function signInSuccess(user) {
  return {
    type: SIGN_IN_SUCCESS,
    user: {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
    },
  }
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
  }
}

const authInitialState = {
  user: false,
}
const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: false,
      }
    default:
      return state
  }
}

export default auth
