import {TextField} from '@mui/material';
import type {ChangeEvent} from 'react';

export interface formInputProps {
  id?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  label?: string;
}

export const FormInput = (props: formInputProps) => {
  return (
    <TextField
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      fullWidth={props.fullWidth}
      label={props.label}
    />
  );
};
