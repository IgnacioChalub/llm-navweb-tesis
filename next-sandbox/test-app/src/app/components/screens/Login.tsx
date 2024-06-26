'use client';
import type {FormEvent} from 'react';
import React, {useState} from 'react';
import styles from 'src/app/styles/form.module.css';
import {loginUser} from 'src/app/service/login';
import {Box} from '@mui/material';
import {FormInput} from 'src/app/components/common/Input/FormInput';
import {Button} from 'src/app/components/common/Button/Button';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser({username, password}).then(() => {
      router.push('/dashboard');
    });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id='login-username-input'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <FormInput
            id='login-password-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <Button
            id='login-button-submit'
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
