import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { CardActions } from 'material-ui/Card';

import { showModalWindow } from '../../core/app';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';


class ViewActions extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    methods: PropTypes.object,
    model: PropTypes.any,
    showModalWindow: PropTypes.func,
    location: PropTypes.object,
  };

  createCallback(callbackParams) {
    if (!callbackParams) {
      return () => {};
    }
    return () => {
      this.props.showModalWindow(callbackParams);
    };
  }

  callSchemaMethod = (name, callback = {}) => {
    const { success = null, fail = null } = callback;
    const onSuccess = this.createCallback(success);
    const onFail = this.createCallback(fail);
    const data = this.props.model;
    this.props.methods[name](data)
      .then(onSuccess)
      .catch(onFail);
  }

  renderActionButton = (name, index) => {
    const { label, method, callback, subview } = this.props.actions[name];
    const { pathname } = this.props.location;
    const query = Object.assign({}, this.props.location.query, {
      subview: JSON.stringify(subview),
    });
    const isSubviewAvailable = subview && !this.props.location.query.subview;
    const LinkToSubView = (
      <Link
        key={index}
        to={{ pathname, query }}
      >
        <RaisedButton
          secondary
          label={label || method}
        />
      </Link>
    );
    const ActionButton = (
      <RaisedButton
        primary
        key={index}
        label={label || method}
        onTouchTap={() => this.callSchemaMethod(name, callback)}
      />
    );
    return isSubviewAvailable ? LinkToSubView : ActionButton;
  }

  render() {
    return (
      <CardActions>
        {Object.keys(this.props.actions)
          .filter(name => name !== SCHEMA_INITIAL_ACTION_NAME)
          .map(this.renderActionButton)}
      </CardActions>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showModalWindow: bindActionCreators(showModalWindow, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ViewActions);
