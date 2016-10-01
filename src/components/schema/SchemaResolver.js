import React, { PropTypes } from 'react';

import { SchemaView } from '../../components/schema';
import { SchemaController } from './SchemaController';

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
    SchemaController.loadSchemasFromUrl(props.location.query).then(schema => {
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
