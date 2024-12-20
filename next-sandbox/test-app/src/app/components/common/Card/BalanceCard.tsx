import {Card, CardContent, CircularProgress, Typography} from '@mui/material';

interface BalanceCardProps {
  balance: number;
  loading: boolean;
}

export const BalanceCard = (props: BalanceCardProps) => {
  return (
    <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2}}>
      <CardContent>
        <Typography variant='h5'>Account Balance</Typography>
        <Typography variant='h3' fontWeight='bold'>
          {props.loading ? (
            <CircularProgress />
          ) : (
            props.balance?.toFixed(2) || '0.00'
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
