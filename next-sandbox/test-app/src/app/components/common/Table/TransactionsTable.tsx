'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {getTransactions} from 'src/app/service/getTransactions';
import {TransactionType} from 'src/app/types/types';
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDate,
  getColor,
} from 'src/app/components/common/utils';

interface TransactionsTableProps {
  userId: number;
  id?: string;
}

type transactions = {
  date: string;
  type: string;
  amount: number;
  from: string;
  to: string;
}[];

const TransactionsTable = (props: TransactionsTableProps) => {
  const [transactions, setTransactions] = useState<transactions>([]);

  useEffect(() => {
    getTransactions({
      userId: props.userId,
    }).then(setTransactions);
  }, [props.userId]);

  return (
    <TableContainer component={Paper} sx={{mb: 4, mt: 4}} id={props.id}>
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
          {transactions.map((row, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {formatDate(row.date)}
              </TableCell>
              <TableCell align='left'>
                {capitalizeFirstLetter(row.type)}
              </TableCell>
              <TableCell align='left'>
                <Typography
                  variant='body2'
                  sx={{color: getColor(row.type, row.amount)}}
                >
                  {row.type === TransactionType.WITHDRAWAL ? '-' : '+'}
                  {formatCurrency(row.amount)}
                </Typography>
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
