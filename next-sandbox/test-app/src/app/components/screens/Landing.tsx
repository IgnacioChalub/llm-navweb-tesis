import Header from '../common/LandingComponents/Header';
import Hero from '../common/LandingComponents/Hero';
import Features from '../common/LandingComponents/Features';
import styles from 'src/app/styles/landing/landing.module.css';

export const Landing = () => {
  return (
    <div>
      <div className={styles.wlanding}>
        <Header />
      </div>
      <div className={styles.hero}>
        <Hero />
      </div>
      <div className={styles.features}>
        <Features />
      </div>
    </div>
  );
};
