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
};

export const TableComponent: FC<TableComponentPropsType> = ({originalRows}) => {
  const [rows, setRows] = React.useState(originalRows);

  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter(row => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    setPage(0);
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
          <TableHeadCustom />
          <TableBodyCustom page={page} rows={rows} rowsPerPage={rowsPerPage} />
        </Table>
      </TableContainer>
    </>
  );
};
