import React, {FC} from 'react';
import {StyledTableRow} from '../../tableStyledComponents/styled-table-row';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {TableHead} from '@mui/material';
import {ColumnValuesType, TableHeadCell} from './table-head-cell';
import {OrderType, RowsType} from '../../table-component';


type TableHeadCustomPropsType = {
  columns: Array<ColumnValuesType>;
  requestSort: (
    newValueOrderBy: keyof RowsType,
    newValueOrder: OrderType,
  ) => void;
  orderBy: string;
  order: OrderType;
};

export const TableHeadCustom: FC<TableHeadCustomPropsType> = ({
  columns,
  requestSort,
  orderBy,
  order,
}) => {
  const mappedTableHeadCell = columns.map(item => {
    return (
      <TableHeadCell
        order={order}
        orderBy={orderBy}
        requestSort={requestSort}
        key={item.headerName}
        ColumnValues={item}
      />
    );
  });
  return (
    <>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell style={{width: 1}}></StyledTableCell>
          {mappedTableHeadCell}
        </StyledTableRow>
      </TableHead>
    </>
  );
};
