import React, { PropTypes, Component } from 'react';
import LinkedList from 'utils/LinkedList';
import RaisedButton from 'material-ui/lib/raised-button';
import { SchemaResolver } from 'components/schema';

export default class SchemaHistory extends Component {
  static propTypes = {
    initial: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.list = new LinkedList();
  }
  componentWillMount() {
    this.list.add(this.props.initial);
    this.state = {
      path: this.list.item(0),
    };
  }
  updatePath = (path) => {
    this.list.add(path);
    this.setState({ path });
  }
  goBack = () => {
    const index = this.list.size();
    if (index > 1) {
      this.list.remove(index - 1);
      const prevPath = this.list.item(this.list.size() - 1);
      this.setState({
        path: prevPath,
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
          path={this.state.path}
          updatePath={this.updatePath}
        />
      </div>
    );
  }
}
