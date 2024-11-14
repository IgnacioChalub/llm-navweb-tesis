'use client';
import React, {useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import {Button} from '../Button/Button';
import {TransactionType} from '../../../types/types';
import axios from 'axios';
import useUserStore from '../../../store/useUserStore';
import {ErrorToast, SuccessToast} from '../Toast/Toast';
import useBalanceStore from '../../../store/useBalanceStore';

const QuickActions: React.FC = () => {
  const [action, setAction] = useState(TransactionType.TRANSFER);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const {user} = useUserStore();
  const {setBalanceFetched} = useBalanceStore();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TransactionType,
  ) => {
    setAction(newValue);
    setAmount('');
    setRecipient('');
  };

  const handleSubmit = async () => {
    const requestData = {
      type: action.toLowerCase(),
      amount: parseFloat(amount),
      ...(action === TransactionType.TRANSFER && {recipientId: recipient}),
    };

    try {
      const response = await axios.post(
        `/api/transaction/${user.id}`,
        requestData,
      );
      SuccessToast('Transaction successful');
      setBalanceFetched(false);
    } catch {
      ErrorToast('An error occurred during the transaction');
    }
  };

  return (
    <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2, maxWidth: 400}}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Quick Actions
        </Typography>
        <Tabs
          value={action}
          onChange={handleTabChange}
          centered
          variant='fullWidth'
          sx={{marginBottom: '1rem'}}
        >
          <Tab label='Transfer' value={TransactionType.TRANSFER} />
          <Tab label='Deposit' value={TransactionType.DEPOSIT} />
          <Tab label='Withdraw' value={TransactionType.WITHDRAWAL} />
        </Tabs>

        <Box
          component='form'
          sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
        >
          <TextField
            label='Amount'
            variant='outlined'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount'
            fullWidth
          />

          {action === TransactionType.TRANSFER && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Recipient</InputLabel>
              <Select
                id='select-recipient'
                value={recipient}
                label='Recipient'
                placeholder='Enter recipient'
                variant='outlined'
                onChange={(event) => setRecipient(event.target.value)}
                fullWidth
              >
                <MenuItem id='beltran-bulbarella' value='19'>
                  Beltran Bulbarella
                </MenuItem>
                <MenuItem id='ignacio-berdiñas' value='19'>
                  Ignacio Berdiñas
                </MenuItem>
                <MenuItem id='ignacio-chalub' value='19'>
                  Ignacio Chalub
                </MenuItem>
              </Select>
            </FormControl>
          )}
          <Button
            id='quick-action-button'
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            onClick={handleSubmit}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
