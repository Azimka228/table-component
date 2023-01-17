import * as React from 'react';
import {FC} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {ProductType} from '../api/api';
import {TableHeadCustom} from './table/table-head-custom';
import {TableFooterCustom} from './table/table-footer-custom';
import {TableSearchBar} from './table/tableSearchBar/table-search-bar';
import {TableBodyCustom} from './table/tableBodyCustom/table-body-custom';

type TableComponentPropsType = {
  originalRows: Array<ProductType>;
  columns: Array<object>;
};

export type OrderType = 'asc' | 'desc' | 'none';

function tableSort(
  array: Array<ProductType>,
  order: 'asc' | 'desc',
  orderBy: string,
) {
  const stabilizedThis = array.map(el => ({...el}));
  let sortedArray: Array<ProductType> = [];
  if (order === 'asc') {
    if (stabilizedThis.find((x: any) => typeof x[orderBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        a[orderBy].localeCompare(b[orderBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => a[orderBy] - b[orderBy],
      );
  }
  if (order === 'desc') {
    if (stabilizedThis.find((x: any) => typeof x[orderBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        b[orderBy].localeCompare(a[orderBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => b[orderBy] - a[orderBy],
      );
  }
  return sortedArray;
}

export const TableComponent: FC<TableComponentPropsType> = ({
  originalRows,
  columns,
}) => {
  const [rows, setRows] = React.useState<Array<ProductType>>(originalRows);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [order, setOrder] = React.useState<OrderType>('none');
  const [orderBy, setOrderBy] = React.useState('none');

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter(row => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });

    const result =
      orderBy !== 'none' && order !== 'none'
        ? tableSort(filteredRows, order, orderBy)
        : filteredRows;

    setRows(result);
    setPage(0);
  };
  const requestSort = (newValueOrderBy: string, newValueOrder: OrderType) => {
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
      setRows(tableSort(rows, newValueOrder, newValueOrderBy));
    } else {
      setRows(originalRows);
    }

    // this is for to sort the new clicked column by asc
    if (orderBy !== newValueOrder && order === 'desc') {
      setRows(tableSort(rows, 'asc', newValueOrderBy));
    }
    if (newValueOrder === 'desc' && newValueOrderBy !== orderBy) {
      setRows(tableSort(rows, 'asc', newValueOrderBy));
    }
  };

  return (
    <>
      {/* TODO*/}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <TableFooterCustom
          rows={rows}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <TableSearchBar onChange={requestSearch} />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 500}}>
          <TableHeadCustom
            columns={columns}
            orderBy={orderBy}
            order={order}
            requestSort={requestSort}
          />
          <TableBodyCustom page={page} rows={rows} rowsPerPage={rowsPerPage} />
        </Table>
      </TableContainer>
    </>
  );
};
