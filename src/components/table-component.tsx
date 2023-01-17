import * as React from 'react';
import {FC} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {ProductType} from '../api/api';
import {TableHeadCustom} from './table/table-head-custom';
import {TablePaginationCustom} from './table/tableToolbar/tablePagination/table-pagination-custom';
import {TableSearchBar} from './table/tableToolbar/tableSearchBar/table-search-bar';
import {TableBodyCustom} from './table/tableBodyCustom/table-body-custom';

type TableComponentPropsType = {
  initialRows: Array<ProductType>;
  columns: Array<object>;
  rowsPerPageOptions: Array<number>;
  searchBy: string;
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
  initialRows,
  columns,
  rowsPerPageOptions,
  searchBy,
}) => {
  const [rows, setRows] = React.useState<Array<ProductType>>(initialRows);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const [order, setOrder] = React.useState<OrderType>('none');
  const [orderBy, setOrderBy] = React.useState('none');

  const requestSearch = (searchedVal: string) => {
    const filteredRows = initialRows.filter((row: any) => {
      if (typeof row[searchBy] === 'number') {
        return String(row[searchBy]).includes(searchedVal);
      }
      return row[searchBy].toLowerCase().includes(searchedVal.toLowerCase());
    });

    // This is to keep sorting by column. if sorting is enabled on any of the columns
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
      setRows(initialRows);
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
        <TablePaginationCustom
          rows={rows}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          rowsPerPageOptions={rowsPerPageOptions}
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
