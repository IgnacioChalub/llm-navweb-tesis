import React from 'react';
import styles from "src/app/styles/about-next13.module.css";

const Page = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Next.js 13</h1>
            <ul className={styles.list}>
                <li className={styles.item}>Enhanced Routing Capabilities</li>
                <li className={styles.item}>Improved Image Optimization</li>
                <li className={styles.item}>New Data Fetching Methods</li>
                <li className={styles.item}>Better Support for Middleware</li>
                <li className={styles.item}>Server Components and Streaming</li>
                <li className={styles.item}>Enhanced CSS Support (including CSS Variables)</li>
                <li className={styles.item}>API Routes Enhancements</li>
                <li className={styles.item}>Next.js Analytics Improvements</li>
                <li className={styles.item}>Upgrade to React 18 and Concurrent Features</li>
                <li className={styles.item}>and more...</li>
            </ul>
            <p>This version focuses on improving the developer experience and performance optimizations.</p>
            <div className={styles.section}>
                <h2 className={styles.subtitle}>Server Components and Streaming</h2>
                <p>Next.js 13 introduces React Server Components, allowing components to render on the server without sending unnecessary JavaScript to the client. This improves load times and reduces bundle sizes. Additionally, streaming capabilities enable progressive rendering of components as data loads.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subtitle}>Enhanced CSS Support</h2>
                <p>Support for advanced CSS features like built-in CSS module support, easier integration with CSS-in-JS libraries, and the ability to use CSS variables natively in JavaScript without additional configuration.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subtitle}>New Layout Model</h2>
                <p>Introduction of a new layout model that enables developers to define layouts at the routing level, allowing for persistent UI components across different pages, enhanced error handling, and seamless transitions.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subtitle}>API Routes Enhancements</h2>
                <p>API routes now support new features for better performance, such as automatic batching and smarter caching. Middleware integration has also been improved, facilitating more complex authentication and data preprocessing scenarios.</p>
            </div>
            <div className={styles.section}>
                <h2 className={styles.subtitle}>React 18 and Concurrent Features</h2>
                <p>With the upgrade to React 18, Next.js 13 leverages concurrent features that enable improvements in interactivity and responsiveness of applications. This includes the use of features like startTransition for improved state transitions without blocking the main thread.</p>
            </div>
        </div>
    );
};

export default Page;

