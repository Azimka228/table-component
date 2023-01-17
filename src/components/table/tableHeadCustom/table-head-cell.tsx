import React, {FC} from 'react';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {TableSortLabel} from '@mui/material';
import {OrderType} from '../../table-component';

type TableHeadCellPropsType = {
  ColumnValues: ColumnValuesType;
  requestSort: (newValueOrderBy: string, newValueOrder: OrderType) => void;
  orderBy: string;
  order: OrderType;
};

export type ColumnValuesType = {
  field: string;
  headerName: string;
  type?: 'number' /* <--- Todo*/;
  sortable?: boolean;
  width: number;
};

export const TableHeadCell: FC<TableHeadCellPropsType> = ({
  ColumnValues,
  requestSort,
  orderBy,
  order,
}) => {
  const handleClick = () => {
    if (order === 'asc') {
      requestSort(ColumnValues.field, 'desc');
    }
    if (order === 'desc') {
      requestSort(ColumnValues.field, 'none');
    }
    if (order === 'none') {
      requestSort(ColumnValues.field, 'asc');
    }
  };

  return (
    <StyledTableCell
      key={ColumnValues.headerName}
      align="center"
      onClick={handleClick}
      style={{width: ColumnValues.width}}
      sortDirection={'asc'}
    >
      <TableSortLabel
        active={orderBy === ColumnValues.field}
        direction={
          orderBy === ColumnValues.field && order !== 'none' ? order : 'asc'
        }
        sx={{
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
        }}
      >
        {ColumnValues.headerName}
      </TableSortLabel>
    </StyledTableCell>
  );
};