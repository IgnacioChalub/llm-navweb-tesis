import {Box, Grid} from '@mui/material';
import CustomCard from 'src/app/components/common/Card/CustomCard';
import TransactionsTable from 'src/app/components/common/Table/TransactionsTable';
import {BalanceCard} from 'src/app/components/common/Card/BalanceCard';
import {QuickActionsCard} from 'src/app/components/common/Card/QuickActionsCard';

const Dashboard = () => {
  return (
    <Box sx={{flexGrow: 1, mx: 4}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <BalanceCard userId={7} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickActionsCard userId={7} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BalanceCard userId={7} />
        </Grid>

        <Grid item xs={12}>
          <CustomCard title='Recent Transactions'>
            <TransactionsTable userId={7} />
          </CustomCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
