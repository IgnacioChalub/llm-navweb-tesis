'use client';
import React from 'react';
import styles from 'src/app/styles/landing/header.module.css';
import {useRouter} from 'next/navigation';
import {RegisterButton} from 'src/app/components/common/Button/Button';

const Header: React.FC = () => {
  const {push} = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartBank</div>
      <div className={styles.buttons}>
        <RegisterButton
          onClick={() => push('/login')}
          className={styles.login}
          id='login-button'
        >
          Login
        </RegisterButton>
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
