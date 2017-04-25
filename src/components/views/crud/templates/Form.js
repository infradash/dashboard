import React, { PropTypes } from 'react';
import Form from "react-jsonschema-form";
import ViewToolbar from '../ViewToolbar';

export default class FormView extends React.Component {
  render() {
    return (
      <Form
        formData={this.props.model}
        schema={this.props.viewConfig.schema}
        onChange={this.props.onModelChange}
      >
        <ViewToolbar
          model={this.props.model}
          viewConfig={this.props.viewConfig}
        />
      </Form>
    )
  }
}

FormView.propTypes = {
  model: PropTypes.any,
  onModelChange: PropTypes.func,
  componentName: PropTypes.string.isRequired,
  viewConfig: PropTypes.object.isRequired,
};