import type {ReactNode} from 'react';
import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import type {formInputProps} from 'src/app/components/common/Input/FormInput';
import {FormInput} from 'src/app/components/common/Input/FormInput';

interface AuthCardProps {
  title: string;
  subtitle: string;
  inputs: formInputProps[];
  button: ReactNode;
  footer?: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  inputs,
  button,
  footer,
}) => {
  return (
    <Card
      sx={{
        margin: 'auto',
        padding: {xs: '1rem', sm: '2rem', md: '3rem'},
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: {xs: 300, sm: 400, md: 500},
        width: '100%',
      }}
    >
      <CardContent>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
        <Typography variant='body1' color='textSecondary' gutterBottom>
          {subtitle}
        </Typography>
        <Box component='form' sx={{mt: 2}}>
          {inputs.map((input) => (
            <Box key={input.id} sx={{mb: 2}}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {input.label}
              </Typography>
              <FormInput
                id={input.id}
                type={input.type}
                value={input.value}
                onChange={input.onChange}
                placeholder={input.placeholder}
                fullWidth={input.fullWidth}
              />
            </Box>
          ))}
          {button}
        </Box>
        {footer && <Box sx={{mt: 2, textAlign: 'center'}}>{footer}</Box>}
      </CardContent>
    </Card>
  );
};

export default AuthCard;
