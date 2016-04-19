import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { listAccounts } from 'core/accounts';
import { AccountList } from 'components/accounts';
import { AccountDetails } from 'views';

class Accounts extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    listAccounts: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      isOpenDialog: false,
    };
  }

  componentWillMount() {
    this.props.listAccounts();
  }

  onAccountSelect = (accountId) => {
    this.setState({
      selectedId: accountId,
      isOpenDialog: true,
    });
  }

  handleLisItemSelect = () => {

  }

  closeDialog = () => {
    this.setState({
      isOpenDialog: false,
    });
  }

  render() {
    return (
      <div>
        <AccountList
          list={this.props.list}
          selectedId={this.state.selectedId}
          onClick={this.onAccountSelect}
          onListItemSelect={this.handleLisItemSelect}
        />
        <AccountDetails
          isOpen={this.state.isOpenDialog}
          closeCallback={this.closeDialog}
          selectedId={this.state.selectedId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.accounts.list,
});

const mapDispatchToProps = (dispatch) => ({
  listAccounts: () => {
    dispatch(listAccounts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
