import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { httpRequest } from '../../core/network';
import { SchemaView } from '../../components/schema';

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


const mapDispatchToProps = (dispatch) => ({
  httpRequest: bindActionCreators(httpRequest, dispatch)
});

export default connect(
  null,
  mapDispatchToProps,
)(SchemaResolver);
