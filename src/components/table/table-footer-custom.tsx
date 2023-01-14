import React, {FC} from 'react';
import {StyledTableRow} from '../tableStyledComponents/styled-table-row';
import TablePagination from '@mui/material/TablePagination';
import {TablePaginationActions} from './tablePaginationActions/table-pagination-actions';

type TableFooterCustomPropsType = {
  rows: Array<any>;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
};

export const TableFooterCustom: FC<TableFooterCustomPropsType> = ({
  rows,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
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

  console.log(page);
  return (
    <StyledTableRow>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
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
    </StyledTableRow>
  );
};
