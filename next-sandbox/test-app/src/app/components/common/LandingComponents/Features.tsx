import React from 'react';
import FeatureCard from './FeatureCard';
import styles from 'src/app/styles/landing/features.module.css';

const Features: React.FC = () => {
  return (
    <section className={styles.features}>
      <FeatureCard
        title='Voice Navigation'
        description='Navigate your finances with ease using our advanced AI-powered voice commands.'
      />
      <FeatureCard
        title='Smart Insights'
        description='Get personalized financial insights and recommendations to help you make better decisions.'
      />
      <FeatureCard
        title='Secure Banking'
        description='Rest easy knowing your data is protected with state-of-the-art security measures.'
      />
    </section>
  );
};

export default Features;
