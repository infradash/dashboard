/* eslint new-cap: ["error", {"capIsNewExceptions": ["SelectableContainerEnhance"]}]*/
import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

export function AccountList({ list, selectedId, onListItemSelect, onClick }) {
  return (
    <SelectableList
      valueLink={{ value: selectedId, requestChange: onListItemSelect }}
    >
      {list.map((account, index) => {
        const selectAccount = onClick.bind(null, account.id);
        return (
          <ListItem
            key={index}
            value={account.id}
            primaryText={account.primary.username}
            onTouchTap={selectAccount}
          />
        );
      })}
    </SelectableList>
  );
}

AccountList.propTypes = {
  list: PropTypes.array.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedId: PropTypes.string
};
