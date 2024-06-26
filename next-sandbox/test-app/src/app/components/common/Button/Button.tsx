import type {MouseEvent, ReactNode} from 'react';
import type {SxProps} from '@mui/system';
import {Button as MUIButton} from '@mui/material';

interface buttonProps {
  id: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'error' | 'primary' | 'inherit';
  size?: 'small' | 'medium' | 'large';
  type?: 'submit';
  sx?: SxProps;
  loading?: boolean;
}

export const Button = (props: buttonProps) => {
  return (
    <MUIButton
      id={props.id}
      variant={props.variant}
      disabled={props.disabled}
      color={props.color}
      size={props.size}
      type={props.type}
      sx={{
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        '&:hover': {
          backgroundColor: '#0070f3',
        },
      }}
      onClick={props.onClick}
    >
      {props.children}
    </MUIButton>
  );
};
