import React, {type FormEvent, useState} from 'react';
import {Box} from '@mui/material';
import styles from 'src/app/styles/form.module.css';
import {FormInput} from 'src/app/components/common/Input/FormInput';
import {Button} from 'src/app/components/common/Button/Button';
import {registerUser} from 'src/app/service/Register';

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registerUser({email, username, password});
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id='email-register-input'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <FormInput
            id='username-register-input'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <FormInput
            id='password-register-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <Button
            id='submit-button-id'
            type='submit'
            disabled={!username || !password}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};
