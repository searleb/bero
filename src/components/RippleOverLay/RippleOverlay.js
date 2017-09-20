import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import styled, { keyframes } from 'styled-components'

const getCircleSize = () => {
  let circleSize = window.outerWidth * 2.5
  if (window.outerHeight > window.outerWidth) {
    circleSize = window.outerHeight * 2.5
  }
  return circleSize
}

const expandToFill = keyframes`
  0% {
    opacity: 0.4;
    width: 0px;
    height: 0px;
  }
  25% {
    border-radius: 100%;
  }
  50% {
    height: ${`${getCircleSize()}px`};
    width: ${`${getCircleSize()}px`};
    border-radius: 100%;
    opacity: 0.55;
  }
  100% {
    height: ${`${getCircleSize()}px`};
    width: ${`${getCircleSize()}px`};
    border-radius: 0;
    opacity: 0;
  }
`

const showContent = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Ripple = styled.div`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 100px;
  border: 1px solid ${props => props.color};
  transform: translate(-50%, -50%);
  opacity: 0;
  background-color: ${props => props.color};
  animation-name: ${expandToFill};
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  z-index: 1;
`

const RippleContent = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${props => props.color};
  opacity: 0;
  z-index: 2;
  animation-name: ${showContent};
  animation-duration: .2s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: linear;
`

class RippleOverlay extends Component {
  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    color: PropTypes.string,
    isOpen: PropTypes.bool,
    trigger: PropTypes.node.isRequired,
  }
  static defaultProps = {
    color: '#ffffff',
    isOpen: false,
    children: '',
    content: '',
  }

  constructor(props) {
    super(props);
    const color = Color(this.props.color)
    this.fadeColor = color.fade(0.04).string()

    this.state = {
      isOpen: this.props.isOpen,
      posX: 0,
      posY: 0,
    }
  }

  handleOverlayToggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
      posX: e.pageX,
      posY: e.pageY,
    })
  }

  renderTrigger = () => (
    React.cloneElement(
      this.props.trigger,
      {
        onClick: this.handleOverlayToggle,
        style: { cursor: 'pointer', position: 'absolute' },
      }
    )
  )

  render() {
    const children = this.props.children || this.props.content
    return (
      <span>
        {this.renderTrigger()}
        {this.state.isOpen &&
          <div>
            <Ripple
              isOpen={this.state.isOpen}
              color={this.props.color}
              style={{
                left: this.state.posX,
                top: this.state.posY,
              }}
            />
            <RippleContent
              isOpen={this.state.isOpen}
              color={this.fadeColor}
              // onClick={this.handleOverlayToggle}
            >
              {children}
            </RippleContent>
          </div>
        }
      </span>
    )
  }
}

export default RippleOverlay
