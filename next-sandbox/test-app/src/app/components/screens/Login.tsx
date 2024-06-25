'use client';
import type {FormEvent} from 'react';
import React, {useState} from 'react';
import styles from 'src/app/styles/form.module.css';
import {loginUser} from 'src/app/service/Login';
import {Box} from '@mui/material';
import {FormInput} from 'src/app/components/common/Input/FormInput';
import {Button} from 'src/app/components/common/Button/Button';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser({username, password});
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id='username-input-id'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <FormInput
            id='password-input-id'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <Button
            id='submit-login-id'
            type='submit'
            disabled={!username || !password}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}