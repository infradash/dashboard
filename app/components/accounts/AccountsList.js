/* eslint new-cap: ["error", {"capIsNewExceptions": ["SelectableContainerEnhance"]}]*/
import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

export function AccountList({ list, selectedId, onAccountSelect }) {
  return (
    <SelectableList
      valueLink={{ value: selectedId, requestChange: onAccountSelect }}
    >
      {list.map((account, index) => (
          <ListItem
            key={index}
            value={account.id}
            primaryText={account.primary.username}
          />
      ))}
    </SelectableList>
  );
}

AccountList.propTypes = {
  list: PropTypes.array.isRequired,
  onAccountSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.string
};
