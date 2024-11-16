import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import type {Transaction} from 'src/app/types/types';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDate,
  getColor,
} from 'src/app/components/common/utils';
import {ArrowCircleDown, ArrowCircleUp, Send} from '@mui/icons-material';

interface TransactionsTableProps {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionsTable = (props: TransactionsTableProps) => {
  return (
    <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2}}>
      <CardContent>
        <Typography variant='h5' sx={{mb: 2}}>
          Recent Transactions
        </Typography>
        <Table>
          <TableBody>
            {props.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: 'none',
                    padding: '5px',
                  }}
                >
                  {/* Display icon based on transaction type */}
                  <Typography
                    variant='body2'
                    component='span'
                    sx={{
                      color: getColor(transaction.type, transaction.amount),
                      marginTop: '0.25rem',
                    }}
                  >
                    {transaction.type === 'deposit' && <ArrowCircleUp />}
                    {transaction.type === 'withdrawal' && <ArrowCircleDown />}
                    {transaction.type === 'transfer' && <Send />}
                  </Typography>
                  <Typography variant='body1' fontWeight='bold'>
                    {capitalizeFirstLetter(transaction.type)}
                  </Typography>
                  {transaction.type === 'transfer' && (
                    <Typography variant='body2' color='textSecondary'>
                      {transaction.sender
                        ? `from ${transaction.sender.username}`
                        : ''}
                      {transaction.recipient
                        ? ` to ${transaction.recipient.username}`
                        : ''}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    color: getColor(transaction.type, transaction.amount),
                    fontWeight: 'bold',
                    borderBottom: 'none',
                  }}
                >
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell sx={{borderBottom: 'none'}}>
                  {formatDate(transaction.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
