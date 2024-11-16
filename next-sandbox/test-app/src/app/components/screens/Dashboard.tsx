'use client';
import {Box, Grid, Typography} from '@mui/material';
import {useEffect} from 'react';
import useBalanceStore from 'src/app/store/useBalanceStore';
import useUserStore from 'src/app/store/useUserStore';
import useTransactionStore from 'src/app/store/useTransactionStore';
import {BalanceCard} from 'src/app/components/common/Card/BalanceCard';
import GraphCard from 'src/app/components/common/Card/GraphCard';
import QuickActions from 'src/app/components/common/Card/QuickActions';
import TransactionsTable from 'src/app/components/common/Table/TransactionsTable';

const Dashboard = () => {
  const {balance, fetchBalance, balanceFetched, balanceLoading} =
    useBalanceStore();
  const {user, userFetched, fetchUser} = useUserStore();
  const {
    transactions,
    transactionsLoading,
    fetchTransactions,
    transactionsFetched,
    setTransactionsFetched,
  } = useTransactionStore();

  useEffect(() => {
    if (!userFetched) {
      fetchUser();
    }
    if (userFetched && !balanceFetched) {
      fetchBalance(user.id);
    }
    if (userFetched && !transactionsFetched) {
      fetchTransactions(user.id);
    }
  }, [
    user,
    userFetched,
    balanceFetched,
    transactionsFetched,
    setTransactionsFetched,
  ]);

  return (
    <Box
      sx={{display: 'flex', flexDirection: 'row', padding: '2rem', gap: '2rem'}}
    >
      <Box sx={{flexGrow: 1}}>
        <Typography variant='h4' gutterBottom>
          {user.username}&apos;s Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <BalanceCard
              balance={balance || 0}
              loading={balanceLoading || transactionsLoading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GraphCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickActions />
          </Grid>
        </Grid>
        {/* Recent Transactions */}
        <Box sx={{marginTop: '2rem'}}>
          <TransactionsTable
            transactions={transactions}
            loading={balanceLoading || transactionsLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
