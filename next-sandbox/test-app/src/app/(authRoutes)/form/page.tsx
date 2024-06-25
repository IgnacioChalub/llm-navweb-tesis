'use client';
import React, {useState} from 'react';
import styles from 'src/app/styles/form.module.css';

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    birthday: '',
    gender: '',
    terms: false,
  });

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted, check the console for data!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sample Form</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id='name-form-input'
            type='text'
            className={styles.input}
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
          />
          <input
            id='age-form-input'
            type='number'
            className={styles.input}
            name='age'
            value={formData.age}
            onChange={handleChange}
            placeholder='Age'
          />
          <input
            id='date-form-input'
            type='date'
            className={styles.input}
            name='birthday'
            value={formData.birthday}
            onChange={handleChange}
          />
          <div>
            <input
              id='male-radio-form-input'
              type='radio'
              className={styles.input}
              name='gender'
              value='male'
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />{' '}
            Male
            <input
              id='female-radio-form-input'
              type='radio'
              className={styles.input}
              name='gender'
              value='female'
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />{' '}
            Female
          </div>
          <div>
            <input
              id='termsAndConditions-checkbox-form-input'
              type='checkbox'
              className={styles.input}
              name='terms'
              checked={formData.terms}
              onChange={handleChange}
            />{' '}
            Agree to terms
          </div>
          <button
            id='submit-button-form-input'
            type='submit'
            className={styles.button}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
