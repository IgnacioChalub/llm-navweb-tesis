import {InputBase} from '@mui/material';
import type {ChangeEvent} from 'react';

interface formInputProps {
  id?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const FormInput = (props: formInputProps) => {
  return (
    <InputBase
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      sx={{
        padding: '0.8rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
      }}
    />
  );
};
