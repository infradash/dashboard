import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


function getColumnValue(object, field) {
  const value = _.get(object, field.bind);
  return field.valueMap ? field.valueMap[value] : value;
}

export default function TableView({ schema, model}) {
  const { form: { tableKeys } } = schema;
  return (
    <Table selectable={false} fixedHeader={true} height="500px">
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow selectable={false}>
          {tableKeys.map((entity, index) => {
            return (
              <TableHeaderColumn key={entity.title}>{entity.title}</TableHeaderColumn>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {Array.isArray(model) && model.map((entity, entityIndex) => {
          return (
            <TableRow selectable={false} key={entityIndex}>
              {tableKeys.map((el, index) => {
                const column = getColumnValue(entity, el);
                return (
                  <TableRowColumn key={index}>{column}</TableRowColumn>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

TableView.propTypes = {
  schema: PropTypes.object.isRequired,
  model: PropTypes.any,
};
