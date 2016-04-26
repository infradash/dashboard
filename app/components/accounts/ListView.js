/* eslint new-cap: ["error", {"capIsNewExceptions": ["SelectableContainerEnhance"]}]*/
import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);

export function ListView({ list, selectedId, onListItemSelect, onClick }) {
  return (
    <SelectableList
      valueLink={{ value: selectedId, requestChange: onListItemSelect }}
    >
      {list.map((entity, index) => {
        const selectEntity = onClick.bind(null, entity.id);
        return (
          <ListItem
            key={index}
            value={entity.id}
            primaryText={entity.primary.username}
            onTouchTap={selectEntity}
          />
        );
      })}
    </SelectableList>
  );
}

ListView.propTypes = {
  list: PropTypes.array.isRequired,
  onListItemSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
