import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { readSavedLocations } from 'api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDestinationLocation } from 'redux/modules/location'

const styles = {
  radioButton: {
    marginTop: 16,
  },
}

/**
 * Dialog content can be scrollable.
 */
class MyPlaces extends React.Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
    updateDestinationLocation: PropTypes.func.isRequired,
  }

  state = {
    open: false,
    places: {},
  }

  componentDidMount() {
    if (this.props.user) {
      readSavedLocations(this.props.user)
    }
  }

  componentWillReceiveProps(nextProps) {
    const setState = (snapshot) => {
      this.setState({ places: snapshot })
    }
    readSavedLocations(nextProps.user, setState)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleNewLocation = (e, id) => {
    this.props.updateDestinationLocation(this.state.places[id])
  }

  render() {
    const { places } = this.state
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Lets Go!'
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ]

    return (
      <div>
        <FlatButton
          label='My places'
          onClick={this.handleOpen}
          disabled={!this.props.user}
        />
        <Dialog
          title='My Places'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: '100%', maxWidth: 'none' }}
        >
          <RadioButtonGroup name='places' onChange={this.handleNewLocation}>
            { places &&
              Object.keys(places).map(key => (
                <RadioButton
                  key={places[key].id}
                  value={places[key].id}
                  label={places[key].name}
                  style={styles.radioButton}
                />
              ))
            }
          </RadioButtonGroup>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDestinationLocation }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaces)
