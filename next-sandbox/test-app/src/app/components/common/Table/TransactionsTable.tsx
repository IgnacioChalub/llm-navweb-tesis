import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {Text} from '../Text/Text';

interface TransactionsTableProps {
  transactions: {
    date: string;
    type: string;
    amount: number;
    from: string;
    to: string;
  }[];
}

const TransactionsTable = (props: TransactionsTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getColor = (amount: number) => {
    if (amount < 0) {
      return 'red';
    } else {
      return 'green'; // Green for positive and zero
    }
  };

  return (
    <TableContainer component={Paper} sx={{mb: 4, mt: 4}}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {row.date}
              </TableCell>
              <TableCell align='left'>{row.type}</TableCell>
              <TableCell align='left'>
                <Text variant='body2' sx={{color: getColor(row.amount)}}>
                  {formatCurrency(row.amount)}
                </Text>
              </TableCell>
              <TableCell align='left'>{row.from}</TableCell>
              <TableCell align='left'>{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
