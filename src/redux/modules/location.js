const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION'
const UPDATE_DESTINATION_LOCATION = 'UPDATE_DESTINATION_LOCATION'

export function updateUserLocation(location) {
  return {
    type: UPDATE_USER_LOCATION,
    location,
  }
}

export function updateDestinationLocation(location) {
  return {
    type: UPDATE_DESTINATION_LOCATION,
    location,
  }
}

const initialState = {
  user: {
    lat: -33.8688,
    lng: 151.2093,
  },
  dest: {
    lat: 0,
    lng: 0,
  },
}

const location = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_LOCATION:
      return {
        ...state,
        user: action.location,
      }
    case UPDATE_DESTINATION_LOCATION:
      return {
        ...state,
        dest: action.location,
      }
    default:
      return state
  }
}

export default location
