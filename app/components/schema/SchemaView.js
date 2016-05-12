import React, { PropTypes } from 'react';
import equal from 'deep-equal';
import { stringCapitalize } from 'utils';
import { createMethods, ListView, EditView } from 'components/schema';

const viewParams = {};

class SchemaView extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    updateSchema: PropTypes.func.isRequired,
    methods: PropTypes.object,
  }

  shouldComponentUpdate(nextProps) {
    return equal(this.props.schema, nextProps.schema);
  }

  // refactor handleListItemSelect, it should be moved to the list view
  handleListItemSelect = (evt) => {
    const { value } = evt.currentTarget.attributes.value;
    const elementData = JSON.parse(value);
    this.props.updateSchema(elementData.location);
    Object.keys(elementData.params).forEach(paramName => {
      viewParams[paramName] = elementData.params[paramName];
    });
  }

  render() {
    const { methods, schema, schema: { type } } = this.props;
    const views = { EditView, ListView };
    const schemaViewName = `${stringCapitalize(type)}View`;
    const View = views[schemaViewName];
    return (
      <View
        methods={methods}
        schema={schema}
        {...type === 'list' ? {
          onTouchTap: this.handleListItemSelect,
        } : null}
      />
    );
  }
}

export default createMethods(props => ({
  params: viewParams,
  actions: props.schema.actions,
}))(SchemaView);
