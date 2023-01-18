import React, {FC} from 'react';
import {ProductType} from '../../../api/api';
import {StyledTableCell} from '../../tableStyledComponents/styled-table-cell';
import {StyledTableRow} from '../../tableStyledComponents/styled-table-row';
import {
  Collapse,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import {ColumnValuesType} from '../tableHeadCustom/table-head-cell';

type TableBodyRowPropsType = {
  row: ProductType;
  columns: Array<ColumnValuesType>
};

export const TableBodyRow: FC<TableBodyRowPropsType> = ({row,columns}) => {
  // console.log('row',row)
  // console.log('columns',columns)

  const [open, setOpen] = React.useState(false);

  const collapseButtonIcons = open ? (
    <KeyboardArrowUpIcon />
  ) : (
    <KeyboardArrowDownIcon />
  );
  const collapseTooltipTitle = open
    ? 'close additional information'
    : 'open additional information';

  return (
    <>
      <StyledTableRow>
        <StyledTableCell>
          <Tooltip title={collapseTooltipTitle}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {collapseButtonIcons}
            </IconButton>
          </Tooltip>
        </StyledTableCell>
        {columns.map((el:ColumnValuesType) => {
          return(<StyledTableCell key={el.field} align="center">{row[el['field'] as keyof ProductType]}</StyledTableCell>)
        })}
      </StyledTableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Images</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.images.map(image => (
                    <TableRow key={image}>
                      <TableCell component="th" scope="row">
                        {image}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
