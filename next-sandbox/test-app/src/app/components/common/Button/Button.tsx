import type {FC, FormEvent, MouseEvent, ReactNode} from 'react';
import type {SxProps} from '@mui/system';
import {Button as MUIButton} from '@mui/material';

interface buttonProps {
  id: string;
  children: ReactNode;
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>,
  ) => void;
  disabled?: boolean;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'error' | 'primary' | 'inherit';
  size?: 'small' | 'medium' | 'large';
  type?: 'submit';
  sx?: SxProps;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
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
      fullWidth={props.fullWidth}
      sx={props.sx}
    >
      {props.children}
    </MUIButton>
  );
};

export const LoginButton: FC<Omit<buttonProps, 'variant' | 'color'>> = (
  props,
) => (
  <Button
    {...props}
    variant='contained'
    color='primary'
    sx={{
      backgroundColor: '#fff',
      color: '#000',
      '&:hover': {
        backgroundColor: '#f3f1f1',
      },
      ...props.sx,
    }}
  />
);

export const RegisterButton: FC<Omit<buttonProps, 'variant' | 'color'>> = (
  props,
) => (
  <Button
    {...props}
    variant='contained'
    color='primary'
    sx={{
      backgroundColor: '#000',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#323131',
      },
      ...props.sx,
    }}
  />
);
