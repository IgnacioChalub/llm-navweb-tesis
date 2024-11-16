import React from 'react';
import styles from 'src/app/styles/landing/hero.module.css';
import {Button} from 'src/app/components/common/Button/Button';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <h1>Welcome to SmartBank</h1>
      <p>
        Experience the future of banking with AI-powered voice navigation and
        smart financial management.
      </p>
      <div className={styles.buttons}>
        <Button className={styles.getStarted} id='get-started-button'>
          Get Started
        </Button>
        <Button className={styles.learnMore} id='learn-more-button'>
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default Hero;
