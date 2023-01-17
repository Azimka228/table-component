import React, {FC} from 'react';
import TableBody from '@mui/material/TableBody';
import {StyledTableRow} from '../../tableStyledComponents/styled-table-row';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {ProductType} from '../../../api/api';
import {TableBodyRow} from './table-body-row';

type TableBodyCustomPropsType = {
  rowsPerPage: number;
  page: number;
  rows: Array<ProductType>;
};

export const TableBodyCustom: FC<TableBodyCustomPropsType> = ({
  rowsPerPage,
  page,
  rows,
}) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map(row => (
        <TableBodyRow key={row.id} row={row} />
      ))}
      {emptyRows > 0 && (
        <StyledTableRow style={{height: 53 * emptyRows}}>
          <StyledTableCell colSpan={6} />
        </StyledTableRow>
      )}
    </TableBody>
  );
};