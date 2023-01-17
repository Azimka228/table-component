import React, {FC} from 'react';
import TablePagination from '@mui/material/TablePagination';
import {TablePaginationActions} from './table-pagination-actions';

type TablePaginationCustomPropsType = {
  rows: Array<any>;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  rowsPerPageOptions: Array<number>;
};

export const TablePaginationCustom: FC<TablePaginationCustomPropsType> = ({
  rows,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  rowsPerPageOptions,
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      sx={{border: 'none'}}
      rowsPerPageOptions={[...rowsPerPageOptions, {label: 'All', value: -1}]}
      colSpan={3}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          'aria-label': 'rows per page',
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};
