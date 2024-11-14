import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import QuickActions from '../common/Card/QuickActions';
import {BalanceCard} from '../common/Card/BalanceCard';

const Dashboard = () => {
  return (
    <Box
      sx={{display: 'flex', flexDirection: 'row', padding: '2rem', gap: '2rem'}}
    >
      <Box sx={{flexGrow: 1}}>
        <Typography variant='h4' gutterBottom>
          Welcome, John Doe
        </Typography>
        <Grid container spacing={2}>
          {/* Account Balance */}
          <BalanceCard />

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <QuickActions />
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        <Box sx={{marginTop: '2rem'}}>
          <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2}}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Transactions
              </Typography>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography
                    sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
                  >
                    <span style={{color: 'green'}}>⬆</span> Deposit
                  </Typography>
                  <Typography sx={{color: 'green'}}>$1000.00</Typography>
                  <Typography>2023-04-01</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography
                    sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
                  >
                    <span style={{color: 'red'}}>⬇</span> Withdrawal
                  </Typography>
                  <Typography sx={{color: 'red'}}>$50.00</Typography>
                  <Typography>2023-04-02</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography
                    sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}
                  >
                    <span style={{color: 'blue'}}>📤</span> Transfer
                  </Typography>
                  <Typography sx={{color: 'blue'}}>$200.00</Typography>
                  <Typography>2023-04-03</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
