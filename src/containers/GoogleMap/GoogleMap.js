import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserLocation } from 'redux/modules/location'

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
  static propTypes = {
    updateUserLocation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    dest: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  /**
  * Checks for geolocation support and asks user
  * to provide their location
  * @method componentDidMount
  */
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(({ coords }) => {
        this.props.updateUserLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        })
      })
    } else {
      alert('This app ain\'t gonna work without your location!')
    }
    // const distance = geolib.getDistance(
    //   { latitude: this.props.user.lat, longitude: this.props.user.lng },
    //   { latitude: this.props.dest.lat, longitude: this.props.dest.lng },
    // )
    // const bearing = geolib.getRhumbLineBearing(
    //   { latitude: this.props.user.lat, longitude: this.props.user.lng },
    //   { latitude: this.props.dest.lat, longitude: this.props.dest.lng },
    // )
    // console.log(distance, bearing);
  }


  render() {
    return (
      <div style={{ width: '100vw', height: 'calc(100vh - 64px)' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDKzdL8XZp-h4L672R336-i9x3fJ-V806o',
          }}
          center={this.props.user}
          defaultZoom={14}
          hoverDistance={32 / 2}
        >
          <GoogleMarkerUser {...this.props.user} />
          {this.props.dest.lng && this.props.dest.lat &&
          <GoogleMarker lat={this.props.dest.lat} lng={this.props.dest.lng} />
          }
        </GoogleMapReact>
      </div>
    )
  }
}

function mapStateToProps({ location }) {
  return {
    user: location.user,
    dest: location.dest,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUserLocation }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMap)
