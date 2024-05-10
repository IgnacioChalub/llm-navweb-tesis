import React from 'react';
import styles from '../../styles/about-next13.module.css';

const Page = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Next.js 13</h1>
            <ul className={styles.list}>
                <li className={styles.item}>Enhanced Routing Capabilities</li>
                <li className={styles.item}>Improved Image Optimization</li>
                <li className={styles.item}>New Data Fetching Methods</li>
                <li className={styles.item}>Better Support for Middleware</li>
                <li className={styles.item}>and more...</li>
            </ul>
            <p>This version focuses on improving the developer experience and performance optimizations.</p>
        </div>
    );
};

export default Page;

