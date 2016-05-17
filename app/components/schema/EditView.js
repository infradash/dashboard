import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import equal from 'deep-equal';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import { SchemaForm } from 'components/react-schema-form';
import objectPath from 'object-path';

import { SCHEMA_INITIAL_ACTION_NAME } from 'config';
import { showModalWindow } from 'core/app';

class EditView extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    methods: PropTypes.object,
    schema: PropTypes.object,
    showModalWindow: PropTypes.func,
  };

  state = {
    model: null,
  };

  componentWillMount() {
    this.props.methods[SCHEMA_INITIAL_ACTION_NAME]().then(response => {
      this.setState({ model: response });
    }).catch(() => ({}));
  }

  componentWillReceiveProps(nextProps) {
    nextProps.methods[SCHEMA_INITIAL_ACTION_NAME]().then(response => {
      this.setState({ model: response });
    }).catch(() => ({}));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(this.state.model, nextState.model);
  }

  onModelChange = (val, key) => {
    const model = Object.assign({}, this.state.model);
    objectPath.set(model, val, key);
    this.setState({ model });
  }

  createCallback(callbackParams) {
    if (!callbackParams) {
      return () => ({});
    }
    return () => {
      this.props.showModalWindow(callbackParams);
    };
  }

  callSchemaMethod = (name, callback = {}) => {
    const { success = null, fail = null } = callback;
    const onSuccess = this.createCallback(success);
    const onFail = this.createCallback(fail);
    const data = Object.assign({}, this.state.model);
    this.props.methods[name](data)
      .then(onSuccess)
      .catch(onFail);
  }

  render() {
    const { fields, actions } = this.props.schema;
    let form = null;
    if (this.state.model) {
      form = (
        <Card>
          <CardText>
            <SchemaForm
              schema={fields}
              model={this.state.model}
              onModelChange={this.onModelChange}
            />
          </CardText>
          <CardActions>
            {Object.keys(actions)
              .filter(name => name !== SCHEMA_INITIAL_ACTION_NAME)
              .map((name, index) => {
                const { label, method, callback } = actions[name];
                return (
                  <RaisedButton
                    primary
                    key={index}
                    label={label || method}
                    onTouchTap={() => this.callSchemaMethod(name, callback)}
                  />
                );
              })}
          </CardActions>
        </Card>
      );
    }
    return form;
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
)(EditView);
