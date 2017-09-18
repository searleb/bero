import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import geolib from 'geolib'
import { SearchBox } from 'components'
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
      user: {
        lat: -33.8688,
        lng: 151.2093,
      },
      dest: {
        lat: '',
        lng: '',
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
        this.setState({
          user: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        })
      })
    } else {
      alert('This app ain\'t gonna work without your location!')
    }
  }

  searchBox = (e) => {
    this.setState({
      dest: {
        lat: e[0].geometry.location.lat(),
        lng: e[0].geometry.location.lng(),
      },
    })

    const distance = geolib.getDistance(
      { latitude: this.state.user.lat, longitude: this.state.user.lng },
      { latitude: this.state.dest.lat, longitude: this.state.dest.lng },
    )
    const bearing = geolib.getRhumbLineBearing(
      { latitude: this.state.user.lat, longitude: this.state.user.lng },
      { latitude: this.state.dest.lat, longitude: this.state.dest.lng },
    )
    console.log(distance, bearing);
  }

  render() {
    return (
      <div style={{ width: '100vw', height: 'calc(100vh - 64px)' }}>
        <SearchBox
          placeholder='gimme'
          onPlacesChanged={this.searchBox}
        />
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDKzdL8XZp-h4L672R336-i9x3fJ-V806o',
          }}
          center={this.state.user}
          defaultZoom={14}
          hoverDistance={32 / 2}
        >
          <GoogleMarkerUser {...this.state.user} />
          {this.state.dest.lng && this.state.dest.lat &&
            <GoogleMarker lat={this.state.dest.lat} lng={this.state.dest.lng} />
          }
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
