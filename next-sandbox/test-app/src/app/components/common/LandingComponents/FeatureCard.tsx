import React from 'react';
import styles from 'src/app/styles/landing/featureCards.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard;
