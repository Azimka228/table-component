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
  sort: 'asc' | 'desc',
  sortBy: string,
) {
  const stabilizedThis = array.map(el => ({...el}));
  let sortedArray: Array<ProductType> = [];
  if (sort === 'asc') {
    if (stabilizedThis.find((x: any) => typeof x[sortBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        a[sortBy].localeCompare(b[sortBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => a[sortBy] - b[sortBy],
      );
  }
  if (sort === 'desc') {
    if (stabilizedThis.find((x: any) => typeof x[sortBy] !== 'number'))
      // sort by string
      sortedArray = stabilizedThis.sort((a: any, b: any) =>
        b[sortBy].localeCompare(a[sortBy]),
      );
    // sort by number
    else
      sortedArray = stabilizedThis.sort(
        (a: any, b: any) => b[sortBy] - a[sortBy],
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
    setRows(filteredRows);
    setPage(0);
  };
  const requestSort = (newValueOrderBy: string, newValueOrder: OrderType) => {
    if (newValueOrderBy !== orderBy) {
      setOrder('asc');
    } else {
      setOrder(newValueOrder);
    }

    // this is for to sort the new clicked column by asc
    if (orderBy !== newValueOrderBy && order === 'desc') {
      setRows(tableSort(rows, 'asc', newValueOrderBy));
    }

    // this is for Disable sorting on current column
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
