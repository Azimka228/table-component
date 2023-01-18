import React, {FC} from 'react';
import {TablePaginationCustom} from './tablePagination/table-pagination-custom';
import {TableSearchBar} from './tableSearchBar/table-search-bar';
import {ProductType} from '../../../api/api';

type TableToolbarPropsType = {
  rows: Array<ProductType>;
  setPage: (e: number) => void;
  setRowsPerPage: (e: number) => void;
  page: number;
  rowsPerPageOptions: Array<number>;
  rowsPerPage: number;
  requestSearch:(searchedVal: string) => void
};

export const TableToolbarCustom: FC<TableToolbarPropsType> = ({
  rows,
  setPage,
  setRowsPerPage,
  page,
  rowsPerPageOptions,
  rowsPerPage,
                                                          requestSearch
}) => {
  const TableToolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
  }


  return (
    <div
      style={TableToolbarStyle}
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
  );
};
