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
  className?: string;
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
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
    </MUIButton>
  );
};
