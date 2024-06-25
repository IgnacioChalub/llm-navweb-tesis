'use client';
import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import CustomCard from './CustomCard';
import {performTransaction} from 'src/app/service/transaction';
import useBalanceStore from 'src/app/store/useBalanceStore';
import {TransactionType} from 'src/app/types/types';

export const QuickActionsCard = ({userId}: {userId: number}) => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<
    | TransactionType.DEPOSIT
    | TransactionType.WITHDRAWAL
    | TransactionType.TRANSFER
  >();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState<number>(0);
  const {balance, setBalanceFetched} = useBalanceStore();
  const [showError, setShowError] = useState(false);

  const handleClickOpen = (type) => {
    setActionType(type);
    setOpen(true);
    setShowError(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount('');
    setRecipient(0);
    setShowError(false);
  };

  const handleConfirm = async () => {
    if (
      (actionType === TransactionType.WITHDRAWAL ||
        actionType === TransactionType.TRANSFER) &&
      balance &&
      balance < parseFloat(amount)
    ) {
      setShowError(true);
      return;
    }

    performTransaction({
      userId,
      type: actionType as TransactionType,
      amount: parseFloat(amount),
      recipientId: recipient,
    }).then(() => {
      if (setBalanceFetched) {
        setBalanceFetched(false);
      }
    });
    handleClose();
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    if (
      balance &&
      (actionType === 'withdrawal' || actionType === 'transfer') &&
      parseFloat(event.target.value) > balance
    ) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <CustomCard title='Quick Actions'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Button
            variant='outlined'
            onClick={() => handleClickOpen(TransactionType.DEPOSIT)}
          >
            Deposit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            onClick={() => handleClickOpen(TransactionType.WITHDRAWAL)}
          >
            Withdraw
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            onClick={() => handleClickOpen(TransactionType.TRANSFER)}
          >
            Transfer
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: '20%',
            maxWidth: '90%',
            width: 'auto',
          },
        }}
      >
        <DialogTitle>{`Perform a ${actionType}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='amount'
            label='Amount'
            type='number'
            fullWidth
            variant='standard'
            value={amount}
            onChange={handleAmountChange}
            error={showError}
          />
          {showError && (
            <Typography color='red' style={{marginTop: 8}}>
              Insufficient balance for this operation.
            </Typography>
          )}
          {actionType === 'transfer' && (
            <TextField
              margin='dense'
              id='recipient'
              label='Recipient ID'
              type='text'
              fullWidth
              variant='standard'
              value={recipient}
              onChange={(e) => setRecipient(Number(e.target.value))}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={showError}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </CustomCard>
  );
};
