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
import useTransactionStore from 'src/app/store/useTransactionStore';
import useBalanceStore from 'src/app/store/useBalanceStore';
import useUserStore from 'src/app/store/useUserStore';
import {TransactionType} from 'src/app/types/types';
import {Button} from 'src/app/components/common/Button/Button';
import {ErrorToast} from 'src/app/components/common/Toast/Toast';

const QuickActions: React.FC = () => {
  const [action, setAction] = useState(TransactionType.TRANSFER);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const {user} = useUserStore();
  const {createTransaction} = useTransactionStore();
  const {setBalanceFetched} = useBalanceStore();
  const {setTransactionsFetched} = useTransactionStore();

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
      type: action,
      amount: parseFloat(amount),
      ...(action === TransactionType.TRANSFER && {recipientId: recipient}),
    };

    try {
      await createTransaction(
        user.id,
        requestData.type,
        requestData.amount,
        requestData.recipientId || '',
      );
      setBalanceFetched(false);
      setAmount('');
      setRecipient('');
      setTransactionsFetched(false);
    } catch {
      ErrorToast('Failed to create transaction');
    }
  };

  return (
    <Card
      sx={{
        padding: '1rem',
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 400,
        height: 300,
      }}
    >
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Quick Actions
        </Typography>
        <Tabs
          value={action}
          onChange={handleTabChange}
          centered
          variant='fullWidth'
          sx={{marginBottom: '1rem'}}
        >
          <Tab
            label='Transfer'
            value={TransactionType.TRANSFER}
            id='transfer-tab'
          />
          <Tab
            label='Deposit'
            value={TransactionType.DEPOSIT}
            id='deposit-tab'
          />
          <Tab
            label='Withdraw'
            value={TransactionType.WITHDRAWAL}
            id='withdraw-tab'
          />
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
            id='amount-input'
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
                <MenuItem id='beltran-bulbarella' value='1'>
                  Beltran Bulbarella
                </MenuItem>
                <MenuItem id='ignacio-berdiñas' value='2'>
                  Ignacio Berdiñas
                </MenuItem>
                <MenuItem id='ignacio-chalub' value='3'>
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
