'use client'
import React from 'react'
import {useState, FormEvent} from 'react';
import styles from "src/app/styles/form.module.css";

export default function RegisterPage() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful:', data);
                alert('Registration successful!');
                // Optionally, redirect the user or clear the form
            } else {
                console.error('Registration failed:', data);
                alert(`Registration failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error, unable to register.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className={styles.input}
                        id='email-register-input'
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className={styles.input}
                        id='username-register-input'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className={styles.input}
                        id='password-register-input'
                    />
                    <button id='submit-button-id' type="submit" className={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
}
