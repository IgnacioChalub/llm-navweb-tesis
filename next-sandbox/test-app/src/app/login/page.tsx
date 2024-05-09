'use client'
import React from 'react'
import { useState, FormEvent } from 'react';
import styles from '../styles/form.module.css';
// import layoutStyles from './styles/Layout.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // Implement login logic here
        console.log('Login:', username, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

