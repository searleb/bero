import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

export default class SearchBox extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func.isRequired,
  }
  static defaultProps = {
    placeholder: 'Search',
  }
  componentDidMount() {
    const input = this.input.input
    console.log(input);
    this.searchBox = new window.google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }

  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
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
