import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDestinationLocation } from 'redux/modules/location'

class SearchBox extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    updateDestinationLocation: PropTypes.func.isRequired,
  }
  static defaultProps = {
    placeholder: 'Search',
  }

  componentDidMount() {
    const input = this.input.input
    this.searchBox = new window.google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }

  onPlacesChanged = () => {
    const place = this.searchBox.getPlaces()
    this.props.updateDestinationLocation({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    })
  }

  render() {
    return (
      <TextField
        ref={(c) => { this.input = c }}
        placeholder={this.props.placeholder}
        type='text'
        fullWidth
        name='google-search-box'
      />
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDestinationLocation }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)
