'use client';
import type {FormEvent} from 'react';
import React, {useState} from 'react';
import {loginUser} from 'src/app/service/login';
import {Typography} from '@mui/material';
import {useRouter} from 'next/navigation';
import AuthCard from '../common/Card/AuthCard';
import styles from 'src/app/styles/app.module.css';
import {RegisterButton} from '../common/Button/Button';

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
    <div className={styles.container}>
      <AuthCard
        title='Login to SmartBank'
        subtitle='Enter your credentials to access your account'
        inputs={[
          {
            id: 'login-username-input',
            type: 'text',
            placeholder: 'JohnDoe',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            fullWidth: true,
            label: 'Username',
          },
          {
            id: 'login-password-input',
            type: 'password',
            placeholder: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            fullWidth: true,
            label: 'Password',
          },
        ]}
        button={
          <RegisterButton
            id='login-button-submit'
            type='submit'
            disabled={!username || !password}
            fullWidth
            onClick={handleSubmit}
          >
            login
          </RegisterButton>
        }
        footer={
          <Typography variant='body1' mt='2rem'>
            Don&apos;t have an account?{' '}
            <a
              id='login-register-link'
              href='/register'
              style={{
                color: 'rgb(54,98,227)',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Register here
            </a>
          </Typography>
        }
      />
    </div>
  );
}
