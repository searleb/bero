import React, { Component } from 'react'
import throttle from 'lodash.throttle'
import styled from 'styled-components'
import geolib from 'geolib'
import { Flex, Box } from 'grid-styled'
import { connect } from 'react-redux'
import Navigation from 'material-ui/svg-icons/maps/navigation'


const CompassContainer = styled.div`
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 3;
  color: white;
`

class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha: 0,
      compassBearing: {},
    };

    this.pointerStyles = {
      margin: '15px',
      transition: 'ease 0.01s',
      width: '75vw',
      height: '75vh',
    }
  }

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      this.getBearing()
    }
  }

  getBearing = () => {
    window.addEventListener('deviceorientation', throttle((event) => {
      const distance = geolib.getDistance(
        { latitude: this.props.user.lat, longitude: this.props.user.lng },
        { latitude: this.props.dest.lat, longitude: this.props.dest.lng },
      )
      const bearing = geolib.getBearing(
        { latitude: this.props.user.lat, longitude: this.props.user.lng },
        { latitude: this.props.dest.lat, longitude: this.props.dest.lng },
      )

      const compassBearing = geolib.getCompassDirection(
        { latitude: this.props.user.lat, longitude: this.props.user.lng },
        { latitude: this.props.dest.lat, longitude: this.props.dest.lng },
      )

      let alpha = 0
      if (event.webkitCompassHeading) {
        alpha = -(event.webkitCompassHeading) + bearing
      } else {
        alpha = (event.alpha - 270) + bearing
      }
      this.setState({
        alpha: alpha.toFixed(3),
        bearing,
        distance: `${geolib.convertUnit('km', distance, 2)} kms`,
        compassBearing,
        webkitCompassHeading: event.webkitCompassHeading,
        accuracy: event.compassAccuracy || event.webkitCompassAccuracy || 0,
      });
    }), 250)
  }

  render() {
    return (
      this.state.compassBearing.lat !== 0 &&
      <CompassContainer>
        <p>{this.state.distance}</p>
        <Flex align='center' justify='center'>
          <Box>
            <Navigation
              style={{
                ...this.pointerStyles,
                transform: `rotateZ(${this.state.alpha}deg)`,
              }}
              color='white'
            />
          </Box>
        </Flex>
        {/* <p>alpha: {this.state.alpha}</p> */}
        {/* <p>bearing: {this.state.bearing}</p> */}
        {/* <p>webkitCompassHeading: {this.state.webkitCompassHeading}</p> */}
        {/* <p>accuracy: {this.state.accuracy}</p> */}
        {/* <p>compassBearing: {this.state.compassBearing.exact}</p> */}
      </CompassContainer>
    )
  }
}

function mapStateToProps({ location }) {
  return {
    user: location.user,
    dest: location.dest,
  }
}

export default connect(
  mapStateToProps,
)(Compass)
