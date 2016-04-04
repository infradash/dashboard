import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from 'core/accounts';
import { AccountsList } from 'components';

class Accounts extends React.Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    fetchAccounts: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.fetchAccounts();
  }
  handleAccountSelect = (e, index) => {
    this.setState({
      selectedIndex: index
    });
  }
  render() {
    return (
      <AccountsList
        list={this.props.accounts.list}
        selectedIndex={this.state && this.state.selectedIndex}
        onAccountSelect={this.handleAccountSelect}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts
});

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => {
    dispatch(fetchAccounts());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
