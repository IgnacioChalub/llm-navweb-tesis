'use client';
import React from 'react';
import type {FormEvent} from 'react';
import {useState} from 'react';
import styles from 'src/app/styles/form.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        alert('Login successful!');
        // Optionally, handle session or redirection here
      } else {
        console.error('Login failed:', data);
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, unable to login.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id='username-input-id'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
            className={styles.input}
          />
          <input
            id='password-input-id'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            className={styles.input}
          />
          <button id='submit-login-id' type='submit' className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
