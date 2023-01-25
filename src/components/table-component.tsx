import * as React from 'react';
import {FC} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {TableHeadCustom} from './table/tableHeadCustom/table-head-custom';
import {TableBodyCustom} from './table/tableBodyCustom/table-body-custom';
import {tableSort} from './table/table-sort';
import {TableToolbarCustom} from './table/tableToolbar/table-toolbar-custom';
import {ColumnValuesType} from './table/tableHeadCustom/table-head-cell';

export type RowsType = Record<string, string | number | string[]>
export type OrderType = 'asc' | 'desc' | 'none';

type TableComponentPropsType = {
  initialRows: Array<RowsType>;
  columns: Array<ColumnValuesType>;
  rowsPerPageOptions: Array<number>;
  searchBy: keyof RowsType;
};


export const TableComponent: FC<TableComponentPropsType> = ({
  initialRows,
  columns,
  rowsPerPageOptions,
  searchBy,
}) => {

  const defaultRowPerPage = rowsPerPageOptions.length > 0 ? rowsPerPageOptions[0] : 5
  const [rows, setRows] = React.useState<Array<RowsType>>(initialRows);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(defaultRowPerPage);

  const [order, setOrder] = React.useState<OrderType>('none');
  const [orderBy, setOrderBy] = React.useState<keyof RowsType | 'none'>(
    'none',
  );

  const requestSearch = (searchedVal: string) => {
    const filteredRows = initialRows.filter((row: RowsType) => {
      return String(row[searchBy])
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });

    // This is to keep sorting by column. if sorting is enabled on any of the columns
    const result =
      orderBy !== 'none' && order !== 'none'
        ? tableSort<RowsType, keyof RowsType>(
            filteredRows,
            order,
            orderBy,
          )
        : filteredRows;

    setRows(result);
    setPage(0);
  };
  const requestSort = (
    newValueOrderBy: keyof RowsType,
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
        tableSort<RowsType, keyof RowsType>(
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
        tableSort<RowsType, keyof RowsType>(rows, 'asc', newValueOrderBy),
      );
    }
    if (newValueOrder === 'desc' && newValueOrderBy !== orderBy) {
      setRows(
        tableSort<RowsType, keyof RowsType>(rows, 'asc', newValueOrderBy),
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
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
    </>
  );
};
