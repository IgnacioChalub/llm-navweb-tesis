import React from 'react';
import {Card, CardContent} from '@mui/material';
import {Text} from 'src/app/components/common/Text/Text';

interface CustomCardProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const CustomCard = ({title, children, id}: CustomCardProps) => {
  return (
    <Card sx={{m: 2, backgroundColor: 'rgb(243, 244, 246)'}} id={id}>
      <CardContent>
        <Text
          variant='h6'
          id={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {title}
        </Text>
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
