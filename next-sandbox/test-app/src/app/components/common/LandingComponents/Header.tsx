'use client';
import React from 'react';
import styles from 'src/app/styles/landing/header.module.css';
import {Button} from '../Button/Button';
import {useRouter} from 'next/navigation';

const Header: React.FC = () => {
  const {push} = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartBank</div>
      <div className={styles.buttons}>
        <Button
          onClick={() => push('/login')}
          className={styles.login}
          id='login-button'
        >
          Login
        </Button>
        <Button
          onClick={() => push('/register')}
          className={styles.register}
          id='register-button'
        >
          Register
        </Button>
      </div>
    </header>
  );
};

export default Header;
