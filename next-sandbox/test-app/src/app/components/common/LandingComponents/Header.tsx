'use client';
import React from 'react';
import styles from 'src/app/styles/landing/header.module.css';
import {LoginButton, RegisterButton} from '../Button/Button';
import {useRouter} from 'next/navigation';

const Header: React.FC = () => {
  const {push} = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartBank</div>
      <div className={styles.buttons}>
        <LoginButton
          onClick={() => push('/login')}
          className={styles.login}
          id='login-button'
        >
          Login
        </LoginButton>
        <RegisterButton
          onClick={() => push('/register')}
          className={styles.register}
          id='register-button'
        >
          Register
        </RegisterButton>
      </div>
    </header>
  );
};

export default Header;
