'use client';
import React from 'react';
import Link from 'next/link';
import styles from 'src/app/styles/app.module.css';
import {Box} from '@mui/material';

const Home = () => {
  return (
    <Box className={styles.container}>
      <h1>Welcome to the App</h1>
      <Box className={styles.navigation}>
        <Link href='/about-next13' id='about-next-button'>
          <p className={styles.link}>About Next.js 13</p>
        </Link>
        <Link href='/form' id='form-button'>
          <p className={styles.link}>Form</p>
        </Link>
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
