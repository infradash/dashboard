import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { SchemaParser } from 'components/schema';
import { parseJSON } from 'utils';

export default class SchemaResolver extends React.Component {
  static propTypes = {
    initial: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      schemaPath: this.props.initial,
      schemaObject: null,
    };
  }

  componentWillMount() {
    this.loadSchema();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.schemaPath === nextState.schemaPath;
  }

  loadSchema() {
    fetch(this.state.schemaPath)
      .then(parseJSON)
      .then(schemaObject => this.setState({ schemaObject }));
  }

  updateSchema = (schemaPath) => {
    this.setState({ schemaPath }, this.loadSchema);
  }

  render() {
    return (
      <div>
        {this.state.schemaObject ?
        <SchemaParser
          schemaObject={this.state.schemaObject}
          updateSchema={this.updateSchema}
        />
        : null}
      </div>
    );
  }
}
