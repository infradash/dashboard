import React, { PropTypes } from 'react';
import connect from 'utils/api-connector';
import { AccountEdit } from 'components/accounts';
import accountSchema from 'schemas/account.json';
import Close from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import { buildUrl } from 'utils';


const schemaActions = Object.keys(accountSchema.actions);

const createRequest = (actionObject, action, props) => {
  const url = buildUrl(actionObject.url, props.selectedId);
  if (action === 'default') {
    return url;
  }
  return (data) => ({
    response: {
      url,
      method: actionObject.method,
      body: JSON.stringify(data),
      andThen: () => {
        props.closeCallback();
        return {};
      },
      andCatch: () => {
        props.closeCallback();
        return {};
      },
    },
  });
};

const mapActions = (props) => {
  const actions = {};
  if (!props.selectedId) {
    return actions;
  }

  schemaActions.forEach((action) => {
    const actionObject = accountSchema.actions[action];
    actions[action] = createRequest(actionObject, action, props);
  });
  return actions;
};

class AccountDetails extends React.Component {
  static propTypes = {
    selectedId: PropTypes.string,
    isOpen: PropTypes.bool,
    closeCallback: PropTypes.func,
    default: PropTypes.object,
  }
  componentWillReceiveProps = () => {
    // console.log(nextProps);
  }

  shouldComponentUpdate = (nextProps) => nextProps.selectedId !== null;

  changeCallback = () => {

  }

  buildActionButton = (actionObj, fn) => (
    <FlatButton
      label={actionObj.label || actionObj.method}
      primary
      onTouchTap={() => fn()}
    />
  )

  render() {
    console.log('render');
    const actions = [
      <FlatButton
        label="Close"
        icon={<Close />}
        secondary
        onTouchTap={this.props.closeCallback}
      />,
    ];
    schemaActions
      .filter(item => item !== 'default')
      .forEach((action) => {
        actions.push(this.buildActionButton(accountSchema.actions[action], this.props[action]));
      });
    const accountData = this.props.default ? this.props.default.value : null;
    const isOpen = this.props.default && this.props.default.fulfilled && this.props.isOpen;
    return (
      <AccountEdit
        selectedAccount={accountData}
        schema={accountSchema.schema}
        actions={actions}
        isOpen={isOpen}
        onClose={this.props.closeCallback}
        onChange={this.changeCallback}
      />
    );
  }
}

export default connect(props => (mapActions(props)))(AccountDetails);
