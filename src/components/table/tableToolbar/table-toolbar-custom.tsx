import React, {FC} from 'react';
import {TablePaginationCustom} from './tablePagination/table-pagination-custom';
import {TableSearchBar} from './tableSearchBar/table-search-bar';
import {ProductType} from '../../../api/api';
import {Button} from '@mui/material';
import {ColumnValuesType} from '../tableHeadCustom/table-head-cell';
import {exportToCsv} from '../export-table-to-csv';

type TableToolbarPropsType = {
  rows: Array<ProductType>;
  columns: Array<ColumnValuesType>;
  setPage: (e: number) => void;
  setRowsPerPage: (e: number) => void;
  page: number;
  rowsPerPageOptions: Array<number>;
  rowsPerPage: number;
  requestSearch: (searchedVal: string) => void
};

export const TableToolbarCustom: FC<TableToolbarPropsType> = ({
                                                                rows,
                                                                columns,
                                                                setPage,
                                                                setRowsPerPage,
                                                                page,
                                                                rowsPerPageOptions,
                                                                rowsPerPage,
                                                                requestSearch,
                                                              }) => {
  const TableToolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
  };

  const handleClickExportCSV = () => {

    const rowsToExport = rows.map((row: any) => {
      const newRows: any = {};
      columns.forEach((column: ColumnValuesType) => {
        newRows[column.field] = row[column.field];
      });
      return newRows;
    });
    const headersToExport = columns.map(column => {
      return column.field;
    });

    exportToCsv('table-component', rowsToExport, headersToExport);
  };

  return (
    <div
      style={TableToolbarStyle}
    >
      <Button onClick={handleClickExportCSV}>Export to csv</Button>
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
  );
};
