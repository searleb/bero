import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
// import { GoogleMarker } from 'components'

const GoogleMarker = () => (
  <span role='img' aria-label='finish' style={{ fontSize: '3em' }}>
    🏁
  </span>
)
const GoogleMarkerUser = () => (
  <span role='img' aria-label='finish' style={{ fontSize: '3em' }}>
    👋
  </span>
)

class GoogleMap extends Component {
  constructor(props) {
    super(props)
    /**
     * Default map center location: Zip Office :)
     * @type {Object}
     */
    this.state = {
      userLocation: {
        lat: -33.8688,
        lng: 151.2093,
      },
    }
  }

  /**
   * Checks for geolocation support and asks user
   * to provide their location
   * @method componentDidMount
   */
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(({ coords }) => {
        console.log('location changed');
        this.setState({
          userLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        })
      })
    } else {
      alert('This app ain\'t gonna work without your location!')
    }
  }

  render() {
    return (
      <div style={{ width: '100vw', height: 'calc(100vh - 64px)' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDKzdL8XZp-h4L672R336-i9x3fJ-V806o',
          }}
          center={this.state.userLocation}
          defaultZoom={14}
          hoverDistance={32 / 2}
        >
          {/* markers.map() */}
          <GoogleMarkerUser {...this.state.userLocation} />
          <GoogleMarker lat={-33.8627684} lng={151.2093256} />
          {/* <GoogleMarker lat={-33.8893835} lng={151.201285} content={'Mentally Friendly!!'} /> */}
        </GoogleMapReact>
      </div>
    )
  }
}

GoogleMap.propTypes = {
  markers: PropTypes.array,
}

GoogleMap.defaultProps = {
  markers: [],
}

export default GoogleMap
