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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

interface QuickActionsCardProps {
  userId: number;
  id?: string;
}

export const QuickActionsCard = (props: QuickActionsCardProps) => {
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
      userId: props.userId,
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
    <CustomCard title='Quick Actions' id={props.id}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            startIcon={<SyncAltIcon />}
            onClick={() => handleClickOpen(TransactionType.TRANSFER)}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              color: 'black',
              borderColor: 'black',
            }}
            id='quick-actions-card-transfer-button'
          >
            Transfer
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            startIcon={<ArrowUpwardIcon />}
            onClick={() => handleClickOpen(TransactionType.DEPOSIT)}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              color: 'black',
              borderColor: 'black',
            }}
            id='quick-actions-card-deposit-button'
          >
            Deposit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            startIcon={<ArrowDownwardIcon />}
            onClick={() => handleClickOpen(TransactionType.WITHDRAWAL)}
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              color: 'black',
              borderColor: 'black',
            }}
            id='quick-actions-card-withdraw-button'
          >
            Withdraw
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: '25%',
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
            label='Amount'
            type='number'
            fullWidth
            variant='standard'
            value={amount}
            onChange={handleAmountChange}
            error={showError}
            id='quick-actions-card-amount-input'
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
          <Button onClick={handleClose} id='quick-actions-card-cancel-button'>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={showError}
            id='quick-actions-card-confirm-button'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </CustomCard>
  );
};
