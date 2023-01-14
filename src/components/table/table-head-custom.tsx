import React from 'react';
import {StyledTableRow} from '../tableStyledComponents/styled-table-row';
import {StyledTableCell} from '../tableStyledComponents/styled-table-cell';
import {TableHead} from '@mui/material';

export const TableHeadCustom = () => {
  return (
    <>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>title</StyledTableCell>
          <StyledTableCell align="right">description</StyledTableCell>
          <StyledTableCell align="right">price</StyledTableCell>
          <StyledTableCell align="right">brand</StyledTableCell>
          <StyledTableCell align="right">brand</StyledTableCell>
        </StyledTableRow>
      </TableHead>
    </>
  );
};
