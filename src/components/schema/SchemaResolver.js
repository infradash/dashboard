import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { httpRequest } from '../../core/network';
import { SchemaView } from '../../components/schema';
import { WidgetView } from '../../components/widget';

class SchemaResolver extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    httpRequest: PropTypes.func,
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
    this.props.httpRequest(props.location.query.schemaUrl).then(schema => {
      this.setState({ schema });
    });
  }

  render() {
    const { schema } = this.state;
    let view = null;
    switch (schema && schema.type) {
      case 'widget':
        view = (
          <WidgetView schema={schema} />
        );
        break;
      case 'list':
      case 'add':
      case 'edit':
      case 'table':
        view = (
          <SchemaView
            schema={schema}
            location={this.props.location}
          />
        );
        break;
      default:
        break;
    }
    return view;
  }
}


const mapDispatchToProps = (dispatch) => ({
  httpRequest: bindActionCreators(httpRequest, dispatch)
});

export default connect(
  null,
  mapDispatchToProps,
)(SchemaResolver);
