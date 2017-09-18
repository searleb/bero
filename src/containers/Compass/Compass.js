import React, { Component } from 'react';
import styled from 'styled-components'


class Compass extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      // add event listener on orientation
      window.addEventListener('deviceorientation', (event) => {
        console.log('deviceorientation', event);
        let alpha;
        // check if iOS
        if (event.webkitCompassHeading !== undefined) {

          alpha = -(event.webkitCompassHeading) - 301.8769266609304

          // test code:
          // $('#alpha').text(event.webkitCompassHeading);
          // $('#accuracy').text(event.webkitCompassAccuracy);
          // $('#alphaWithBearing').text(alpha);
          // $('#version').text(6);

          // Rotation is reversed for iOS
          this.setState({ rotation: `rotate(${alpha}deg)` })
        }
        // non iOS
        else {
          alpha = event.alpha;
          // webkitAlpha = alpha + userCompass.bearing;
          // $('#webkitAlpha').text(webkitAlpha);
          if (!window.chrome) {
            // Assume (make an ass out of u and me) Android stock and apply offset
            // webkitAlpha = alpha-270;
            // $('#webkitAlpha').text(webkitAlpha);
          }
        }
        // handle transform for browsers
        this.setState({ rotation: `rotate(${alpha}deg)` })
        // compass.style.WebkitTransform = `rotate(${webkitAlpha}deg)`;
        // rotation is reversed for FireFox
        // compass.style.MozTransform = `rotate(-${alpha}deg)`;
        // return false if no orientation support detected
      }, false);
    }
  }

  render() {
    return (
      <div>
        <span style={{ transform: this.state.rotation }}>👆</span>
      </div>
    );
  }
}

export default Compass;
