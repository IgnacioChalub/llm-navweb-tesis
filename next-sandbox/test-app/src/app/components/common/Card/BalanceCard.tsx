'use client';
import useBalanceStore from 'src/app/store/useBalanceStore';
import CustomCard from 'src/app/components/common/Card/CustomCard';
import {useEffect} from 'react';
import {Skeleton} from '@mui/material';

interface BalanceCardProps {
  userId: number;
  id?: string;
}

export const BalanceCard = (props: BalanceCardProps) => {
  const {balance, loading, error, fetchBalance, balanceFetched} =
    useBalanceStore();

  useEffect(() => {
    if (!balanceFetched) {
      fetchBalance(props.userId);
    }
  }, [props.userId, fetchBalance, balanceFetched]);

  return (
    <CustomCard title='Account Balance' id={props.id}>
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
