'use client';
import React from 'react';
import Link from 'next/link';
import styles from 'src/app/styles/app.module.css';
import {Box} from '@mui/material';

const Home = () => {
  return (
    <Box className={styles.container}>
      <h1>Welcome to the Thesis Bank</h1>
      <Box className={styles.navigation}>
        <Link href='/login' id='login-button'>
          <p className={styles.link}>Login</p>
        </Link>
        <Link href='/register' id='register-button'>
          <p className={styles.link}>Register</p>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
