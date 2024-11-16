import {Line} from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {Box, Card, CardContent, Typography} from '@mui/material';
import React from 'react';

// Register the required components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export const GraphCard = () => {
  // Hardcoded data for the graph
  const chartData = {
    labels: [
      '2024-11-10',
      '2024-11-11',
      '2024-11-12',
      '2024-11-13',
      '2024-11-14',
    ],
    datasets: [
      {
        label: 'Balance Over Time',
        data: [350, 400, 420, 390, 450],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Balance ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card sx={{padding: '1rem', boxShadow: 3, borderRadius: 2, height: 300}}>
      <CardContent>
        <Typography variant='h5' sx={{mb: 2}}>
          Account Balance
        </Typography>
        <Box>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphCard;
