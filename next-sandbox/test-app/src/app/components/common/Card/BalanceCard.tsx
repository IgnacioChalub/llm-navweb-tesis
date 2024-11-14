'use client';
import {Card, CardContent, Grid, Typography} from '@mui/material';
import useBalanceStore from '../../../store/useBalanceStore';
import useUserStore from '../../../store/useUserStore';
import {useEffect} from 'react';

export const BalanceCard = () => {
  const {balance, fetchBalance, balanceFetched} = useBalanceStore();
  const {user, userFetched, fetchUser} = useUserStore();

  useEffect(() => {
    if (!userFetched) {
      fetchUser();
    }
    if (user && !balanceFetched) {
      fetchBalance(user.id);
    }
  }, [user, userFetched, balanceFetched]);
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2}}>
        <CardContent>
          <Typography variant='h6'>Account Balance</Typography>
          <Typography variant='h3' fontWeight='bold'>
            ${balance?.toFixed(2) || '0.00'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
