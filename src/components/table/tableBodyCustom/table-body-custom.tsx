import React, {FC} from 'react';
import TableBody from '@mui/material/TableBody';
import {StyledTableRow} from '../../tableStyledComponents/styled-table-row';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {ProductType} from '../../../api/api';
import {TableBodyRow} from './table-body-row';
import {ColumnValuesType} from '../tableHeadCustom/table-head-cell';
import s from './table-body-custom.module.css'

type TableBodyCustomPropsType = {
  rowsPerPage: number;
  page: number;
  rows: Array<ProductType>;
  columns: Array<ColumnValuesType>;
};



export const TableBodyCustom: FC<TableBodyCustomPropsType> = ({
                                                                rowsPerPage,
                                                                page,
                                                                rows,
                                                                columns,
                                                              }) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const currentRows = rowsPerPage > 0
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows;

  return (
    <TableBody>
      {currentRows.length > 0 ?
        currentRows.map(row => (<TableBodyRow key={row.id} row={row} columns={columns} />))
        :
        // temporary solution for displaying empty rows
        <div className={s.emptyRows}>Rows is empty</div>}
      {emptyRows > 0 && (
        <StyledTableRow style={{height: 53 * emptyRows}}>
          <StyledTableCell colSpan={6} />
        </StyledTableRow>
      )}
    </TableBody>
  );
};
