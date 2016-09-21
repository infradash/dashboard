import React, { PropTypes } from 'react';
import {
  AddView,
} from '../../components/schema';

export default class HttpParamsForm extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
  };

  state = {
    model: null,
  };

  updateValues() {
  }

  render() {
    return (
      <AddView schema={this.props.schema} onModelChange={this.updateValues} />
    );
  }
}
