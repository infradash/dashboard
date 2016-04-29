import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import { SchemaForm, utils } from 'react-schema-form';

//export class EditView({ schema, model, actions = [] }) {
export class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: this.props.model,
    };
  }

  componentWillChange(nextProps, nextState) {
  }

  onModelChange = (key, val) => {
    this.setState({ model: utils.selectOrSet(key, this.props.model, val) });
  }

  render () {
    return (
      <Card>
        <CardText>
          <SchemaForm
            schema={this.props.schema}
            model={this.state.model}
            onModelChange={this.onModelChange}
          />
        </CardText>
        <CardActions>
          {this.props.actions.map((action, index) => (
            <RaisedButton
              key={index}
              label={action.name}
              primary
              onTouchTap={() => console.log(this.state.model)}
            />
          ))}
        </CardActions>
      </Card>
    );
  }
}

EditView.propTypes = {
  model: PropTypes.object,
  schema: PropTypes.object,
  actions: PropTypes.array,
};
