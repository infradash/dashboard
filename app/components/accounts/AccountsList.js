/* eslint new-cap: ["error", {"capIsNewExceptions": ["SelectableContainerEnhance"]}]*/
import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

export function AccountsList({ list, selectedIndex, onAccountSelect }) {
  return (
    <SelectableList
      subheader="Accounts"
      valueLink={{ value: selectedIndex, requestChange: onAccountSelect }}
    >
      {list.map((account, index) => (
        <ListItem
          key={account.id}
          value={index}
          primaryText={account.primary.username}
        />
      ))}
    </SelectableList>
  );
}

AccountsList.propTypes = {
  list: PropTypes.array.isRequired,
  onAccountSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number
};
