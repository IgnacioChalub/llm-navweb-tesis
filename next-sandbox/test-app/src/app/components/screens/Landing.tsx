import styles from 'src/app/styles/landing/landing.module.css';
import Header from 'src/app/components/common/LandingComponents/Header';
import Hero from 'src/app/components/common/LandingComponents/Hero';
import Features from 'src/app/components/common/LandingComponents/Features';

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
