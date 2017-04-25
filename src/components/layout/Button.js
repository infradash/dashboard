import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class Button extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onTouchTap: PropTypes.func,
  };

  render() {
    return (
        <RaisedButton
            primary
            type={this.props.type}
            label={this.props.label}
            onTouchTap={this.props.onTouchTap}
            disabled={this.props.isLoading}
        />
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading
});

export default connect(
  mapStateToProps
)(Button);
