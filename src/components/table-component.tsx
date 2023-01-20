import * as React from 'react';
import {FC} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {ProductType} from '../api/api';
import {TableHeadCustom} from './table/tableHeadCustom/table-head-custom';
import {TableBodyCustom} from './table/tableBodyCustom/table-body-custom';
import {tableSort} from './table/table-sort';
import {TableToolbarCustom} from './table/tableToolbar/table-toolbar-custom';
import {ColumnValuesType} from './table/tableHeadCustom/table-head-cell';

type TableComponentPropsType = {
  initialRows: Array<ProductType>;
  columns: Array<ColumnValuesType>;
  rowsPerPageOptions: Array<number>;
  searchBy: keyof ProductType;
};

export type OrderType = 'asc' | 'desc' | 'none';

export const TableComponent: FC<TableComponentPropsType> = ({
  initialRows,
  columns,
  rowsPerPageOptions,
  searchBy,
}) => {
  const [rows, setRows] = React.useState<Array<ProductType>>(initialRows);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [order, setOrder] = React.useState<OrderType>('none');
  const [orderBy, setOrderBy] = React.useState<keyof ProductType | 'none'>(
    'none',
  );

  const requestSearch = (searchedVal: string) => {
    const filteredRows = initialRows.filter((row: ProductType) => {
        return String(row[searchBy]).toLowerCase().includes(searchedVal.toLowerCase());
    });

    // This is to keep sorting by column. if sorting is enabled on any of the columns
    const result =
      orderBy !== 'none' && order !== 'none'
        ? tableSort<ProductType, keyof ProductType>(
            filteredRows,
            order,
            orderBy,
          )
        : filteredRows;

    setRows(result);
    setPage(0);
  };
  const requestSort = (
    newValueOrderBy: keyof ProductType,
    newValueOrder: OrderType,
  ) => {
    if (newValueOrderBy !== orderBy) {
      setOrder('asc');
    } else {
      setOrder(newValueOrder);
    }

    if (newValueOrderBy === orderBy && newValueOrder === 'none') {
      setOrderBy('none');
    } else {
      setOrderBy(newValueOrderBy);
    }

    if (newValueOrder !== 'none') {
      setRows(
        tableSort<ProductType, keyof ProductType>(
          rows,
          newValueOrder,
          newValueOrderBy,
        ),
      );
    } else {
      setRows(initialRows);
    }

    // this is for to sort the new clicked column by asc
    if (orderBy !== newValueOrder && order === 'desc') {
      setRows(
        tableSort<ProductType, keyof ProductType>(rows, 'asc', newValueOrderBy),
      );
    }
    if (newValueOrder === 'desc' && newValueOrderBy !== orderBy) {
      setRows(
        tableSort<ProductType, keyof ProductType>(rows, 'asc', newValueOrderBy),
      );
    }
  };

  return (
    <>
      <TableToolbarCustom
        page={page}
        rows={rows}
        columns={columns}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        requestSearch={requestSearch}
      />
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 500}}>
          <TableHeadCustom
            columns={columns}
            orderBy={orderBy}
            order={order}
            requestSort={requestSort}
          />
          <TableBodyCustom
            page={page}
            rows={rows}
            columns={columns}
            rowsPerPage={rowsPerPage} />
        </Table>
      </TableContainer>
    </>
  );
};
