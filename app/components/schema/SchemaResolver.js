/* eslint no-param-reassign: ["error", { "props": false }]*/
import React, { PropTypes } from 'react';

import { SchemaView } from '../../components/schema';
import { createRequestPromise } from '../../utils/network';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    schema: null,
  }

  componentWillMount() {
    this.loadSchema(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSchema(nextProps);
  }

  shouldComponentUpdate(nextProps) {
    const currentLocation = this.props.location;
    const nextLocation = nextProps.location;
    return currentLocation.query === nextLocation.query &&
      currentLocation.action === nextLocation.action;
  }

  loadSchema(props) {
    const schemas = [];
    schemas.push(props.location.query.schemaUrl);
    if (props.location.query.subview) {
      let { subview } = props.location.query;
      subview = JSON.parse(subview);
      schemas.push(subview.schemaUrl);
    }
    const promises = schemas.map(url => createRequestPromise(url));
    Promise.all(promises).then(values => {
      const schema = values.reduce((obj, value, index) => {
        obj[schemas[index]] = value;
        return obj;
      }, {});
      this.setState({ schema });
    });
  }

  render() {
    return (
      <div>
        {this.state.schema ?
          <SchemaView
            schema={this.state.schema}
            location={this.props.location}
          />
        : null}
      </div>
    );
  }
}
