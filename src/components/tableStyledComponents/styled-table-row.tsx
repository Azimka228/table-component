import {styled} from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(4n+1)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
