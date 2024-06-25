'use client';
import useBalanceStore from 'src/app/store/useBalanceStore';
import CustomCard from './CustomCard';
import {useEffect} from 'react';
import {Skeleton} from '@mui/material';

export const BalanceCard = ({userId}: {userId: number}) => {
  const {balance, loading, error, fetchBalance, balanceFetched} =
    useBalanceStore();

  useEffect(() => {
    if (!balanceFetched) {
      fetchBalance(userId);
    }
  }, [userId, fetchBalance, balanceFetched]);

  return (
    <CustomCard title='Account Balance'>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{balance ? `$${balance.toFixed(2)}` : '$0'}</p>
      )}
    </CustomCard>
  );
};
