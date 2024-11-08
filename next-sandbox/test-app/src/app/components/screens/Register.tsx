import React, {type FormEvent, useState} from 'react';
import {Typography} from '@mui/material';
import {RegisterButton} from 'src/app/components/common/Button/Button';
import {registerUser} from 'src/app/service/register';
import {useRouter} from 'next/navigation';
import styles from '../../styles/app.module.css';
import AuthCard from '../common/Card/AuthCard';

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {push} = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registerUser({email, username, password}).then(() => {
      push('/login');
    });
  };

  return (
    <div className={styles.container}>
      <AuthCard
        title='Login to SmartBank'
        subtitle='Enter your credentials to access your account'
        inputs={[
          {
            id: 'register-email-input',
            type: 'email',
            placeholder: 'johndoe@mail.com',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            fullWidth: true,
            label: 'Email',
          },
          {
            id: 'register-username-input',
            type: 'text',
            placeholder: 'JohnDoe',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            fullWidth: true,
            label: 'Username',
          },
          {
            id: 'register-password-input',
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
            id='register-button-submit'
            type='submit'
            disabled={!username || !password}
            fullWidth
            onClick={handleSubmit}
          >
            Register
          </RegisterButton>
        }
        footer={
          <Typography variant='body1' mt='2rem'>
            Already have an account?{' '}
            <a
              href='/login'
              style={{
                color: 'rgb(54,98,227)',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Login here
            </a>
          </Typography>
        }
      />
    </div>
  );
};
