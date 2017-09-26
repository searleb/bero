const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION'
const UPDATE_DESTINATION_LOCATION = 'UPDATE_DESTINATION_LOCATION'
const UPDATE_BOUNDS = 'UPDATE_BOUNDS'

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

export function updateBounds(bounds) {
  return {
    type: UPDATE_BOUNDS,
    bounds,
  }
}

const initialState = {
  user: {
    lat: -33.8688,
    lng: 151.2093,
  },
  dest: {
    name: 'location',
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
    case UPDATE_BOUNDS:
      return {
        ...state,
        bounds: action.bounds,
      }
    default:
      return state
  }
}

export default location
