import React, {FC} from 'react';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {TableSortLabel} from '@mui/material';
import {OrderType, RowsType} from '../../table-component';

type TableHeadCellPropsType = {
  ColumnValues: ColumnValuesType;
  requestSort: (
    newValueOrderBy: keyof RowsType,
    newValueOrder: OrderType,
  ) => void;
  orderBy: string;
  order: OrderType;
};

export type ColumnValuesType = {
  field: string;
  headerName: string;
  type?: 'number' | 'string' | 'Date';
  sortable: boolean;
  width: number;
};

export const TableHeadCell: FC<TableHeadCellPropsType> = ({
  ColumnValues,
  requestSort,
  orderBy,
  order,
}) => {
  const handleClick = () => {
    if (!ColumnValues.sortable) {
      return;
    }
    if (order === 'asc') {
      requestSort(ColumnValues.field as keyof RowsType, 'desc');
    }
    // it's for disabling sort in column
    if (order === 'desc') {
      requestSort(ColumnValues.field as keyof RowsType, 'none');
    }
    if (order === 'none') {
      requestSort(ColumnValues.field as keyof RowsType, 'asc');
    }
  };

  const tableSortLabelStyles = {
    '&.MuiTableSortLabel-root': {
      color: 'white',
    },
    '&.MuiTableSortLabel-root:hover': {
      color: 'white',
    },
    '&.Mui-active': {
      color: 'white',
    },
    '& .MuiTableSortLabel-icon': {
      color: 'white !important',
    },
  }

  return (
    <StyledTableCell
      key={ColumnValues.headerName}
      align="center"
      onClick={handleClick}
      style={{width: ColumnValues.width}}
      sortDirection={'asc'}
    >
      {ColumnValues.sortable && (
        <TableSortLabel
          active={orderBy === ColumnValues.field}
          direction={
            orderBy === ColumnValues.field && order !== 'none' ? order : 'asc'
          }
          sx={tableSortLabelStyles}
        >
          {ColumnValues.headerName}
        </TableSortLabel>
      )}
      {!ColumnValues.sortable && ColumnValues.headerName}
    </StyledTableCell>
  );
};
