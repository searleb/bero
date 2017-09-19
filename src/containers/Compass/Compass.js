import React, { Component } from 'react'
import throttle from 'lodash.throttle'
import styled from 'styled-components'
import geolib from 'geolib'
import { connect } from 'react-redux'


class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha: 0,
      compassBearing: {},
    };
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
        distance,
        compassBearing,
        webkitCompassHeading: event.webkitCompassHeading,
        accuracy: event.compassAccuracy || event.webkitCompassAccuracy || 0,
      });
    }), 250)
  }

  render() {
    return (
      <div>
        <span
          role='img'
          aria-label='emohi'
          style={{
            margin: '15px',
            display: 'inline-block',
            fontSize: '3em',
            transition: 'ease 0.01s',
            transform: `rotateZ(${this.state.alpha}deg)`,
          }}
        >👆</span>
        <p>alpha: {this.state.alpha}</p>
        <p>bearing: {this.state.bearing}</p>
        <p>webkitCompassHeading: {this.state.webkitCompassHeading}</p>
        <p>distance: {this.state.distance}</p>
        <p>accuracy: {this.state.accuracy}</p>
        <p>compassBearing: {this.state.compassBearing.exact}</p>
      </div>
    );
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
