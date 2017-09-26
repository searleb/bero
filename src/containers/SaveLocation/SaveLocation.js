import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { auth, provider, writeToSavedLocations } from 'api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FlatButton from 'material-ui/FlatButton'

class SaveLocation extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
  }

  handleSaveLocation = () => writeToSavedLocations(this.props.user, this.props.destination)

  render() {
    return (
      <FlatButton
        label={`Save ${this.props.destination.name}`}
        onClick={this.handleSaveLocation}
        primary
        disabled={!this.props.user || this.props.destination.name === 'location'}
      />
    )
  }
}


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ }, dispatch),
})

const mapStateToProps = state => ({
  user: state.auth.user,
  destination: state.location.dest,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveLocation)
