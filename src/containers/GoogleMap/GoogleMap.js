import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateUserLocation, updateBounds } from 'redux/modules/location'
import Spinner from 'react-spinkit'
import mapStyles from './map-styles'

const GoogleMarker = () => (
  <Spinner name='double-bounce' color='burlywood' />
)
const GoogleMarkerUser = () => (
  <Spinner name='double-bounce' color='lightblue' />
)

class GoogleMap extends Component {
  static propTypes = {
    updateUserLocation: PropTypes.func.isRequired,
    updateBounds: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    dest: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      zoom: 15,
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
        this.props.updateUserLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        })
      })
    } else {
      alert('This app ain\'t gonna work without your location!')
    }
  }

  handleOnChange = (e) => {
    // TODO: not sure this really works
    const { center, zoom } = fitBounds(e.bounds, e.size);
    this.setState({ zoom, center })
  }

  handleMaps = (map) => {
    this.props.updateBounds(map.getBounds())
    // TODO: trying to get the map to zoom to fit bounds
    // map.fitBounds(map.getBounds())

    // console.log('map: ', map);
    // console.log(map.getBounds());
    // map.fitBounds(map.getBounds())
    // console.log(maps.LatLngBounds());
  }


  render() {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <GoogleMapReact
          ref={(c) => { this.map = c }}
          onChange={this.handleOnChange}
          center={this.props.user}
          defaultZoom={15}
          zoom={this.state.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.handleMaps(map, maps)}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            key: 'AIzaSyDKzdL8XZp-h4L672R336-i9x3fJ-V806o',
          }}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
          }}
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
  return bindActionCreators({ updateUserLocation, updateBounds }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMap)
