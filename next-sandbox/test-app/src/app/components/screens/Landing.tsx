'use client';

import React from 'react';
import styles from 'src/app/styles/landing.module.css';
import {useRouter} from 'next/navigation';
import {
  Button,
  LoginButton,
  RegisterButton,
} from 'src/app/components/common/Button/Button';

export const Landing: React.FC = () => {
  const {push} = useRouter();

  return (
    <div>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>SmartBank</div>
        <div className={styles.headerButtons}>
          <LoginButton
            // This is a redirect to /login
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

      {/* Hero Section */}
      <div className={styles.heroContainer}>
        <section className={styles.heroContent}>
          <h1>Welcome to SmartBank</h1>
          <p>
            Experience the future of banking with AI-powered voice navigation
            and smart financial management.
          </p>
          <div className={styles.heroButtons}>
            <Button className={styles.getStarted} id='get-started-button'>
              Get Started
            </Button>
            <Button className={styles.learnMore} id='learn-more-button'>
              Learn More
            </Button>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <section className={styles.featuresSection}>
          <div className={styles.featureCard}>
            <h3>Voice Navigation</h3>
            <p>
              Navigate your finances with ease using our advanced AI-powered
              voice commands.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Smart Insights</h3>
            <p>
              Get personalized financial insights and recommendations to help
              you make better decisions.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Secure Banking</h3>
            <p>
              Rest easy knowing your data is protected with state-of-the-art
              security measures.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
