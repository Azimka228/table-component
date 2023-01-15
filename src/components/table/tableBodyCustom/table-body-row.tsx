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

type TableBodyRowPropsType = {
  row: ProductType;
};

export const TableBodyRow: FC<TableBodyRowPropsType> = ({row}) => {
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
        <StyledTableCell align="center">{row.title}</StyledTableCell>
        <StyledTableCell align="center">{row.description}</StyledTableCell>
        <StyledTableCell align="center">{row.price}</StyledTableCell>
        <StyledTableCell align="center">{row.brand}</StyledTableCell>
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
