import React, { PropTypes, Component } from 'react';
import LinkedList from 'utils/LinkedList';
import RaisedButton from 'material-ui/lib/raised-button';
import { SchemaResolver } from 'components/schema';

export default class SchemaHistory extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.list = new LinkedList();
  }
  componentWillMount() {
    this.list.add(this.props.location);
    this.state = {
      location: this.list.item(0),
    };
  }
  componentWillReceiveProps(nextProps) {
    const index = this.list.size();
    if (index > 1) {
      this.list.remove(index - 1);
    }
    this.setState({
      location: nextProps.location,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.location !== nextState.location;
  }
  updateLocation = (location) => {
    this.list.add(location);
    this.setState({ location });
  }
  goBack = () => {
    const index = this.list.size();
    if (index > 1) {
      this.list.remove(index - 1);
      const prevLocation = this.list.item(this.list.size() - 1);
      this.setState({
        location: prevLocation,
      });
    }
  }
  render() {
    return (
      <div>
        <RaisedButton
          label="Go back"
          onTouchTap={this.goBack}
          disabled={this.list.size() <= 1}
        />
        <SchemaResolver
          location={this.state.location}
          updateLocation={this.updateLocation}
        />
      </div>
    );
  }
}
