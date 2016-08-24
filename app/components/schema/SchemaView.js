import React, { PropTypes } from 'react';
import objectPath from 'object-path';
import { stringCapitalize } from '../../utils';
import { SCHEMA_INITIAL_ACTION_NAME } from '../../config';
import {
  createMethods,
  ViewActions,
  AddView,
  EditView,
  ListView,
 } from '../../components/schema';

export class SchemaView extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    methods: PropTypes.object,
  };

  state = {
    model: null,
  };

  componentWillMount() {
    this.loadModel(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadModel(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.model !== nextState.model;
  }

  onModelChange = (val, key) => {
    const model = { ...this.state.model };
    objectPath.set(model, val, key);
    if (JSON.stringify(model) !== JSON.stringify(this.state.model)) {
      this.setState({ model });
    }
  }

  loadModel(props) {
    if (props.methods[SCHEMA_INITIAL_ACTION_NAME]) {
      props.methods[SCHEMA_INITIAL_ACTION_NAME]()
        .then(model => {
          this.setState({ model });
        });
    }
  }

  render() {
    const views = { EditView, ListView, AddView };
    const { methods, location, schema } = this.props;
    let selectedSchema = schema[location.query.schemaUrl];
    const { actions } = selectedSchema;
    if (location.query.subview) {
      const subview = JSON.parse(location.query.subview);
      selectedSchema = schema[subview.schemaUrl];
    }
    const { type } = selectedSchema;

    const schemaViewName = `${stringCapitalize(type)}View`;
    const View = views[schemaViewName];

    return (
      <div>
        <ViewActions
          model={this.state.model}
          location={location}
          actions={actions}
          methods={methods}
        />
        <View
          model={this.state.model}
          location={location}
          methods={methods}
          actions={actions}
          schema={selectedSchema}
          onModelChange={this.onModelChange}
        />
      </div>
    );
  }
}

export default createMethods()(SchemaView);
