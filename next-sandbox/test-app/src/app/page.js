'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ input1: '', input2: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input 1:', formData.input1);
    console.log('Input 2:', formData.input2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id='input1-id' type="text" name="input1" value={formData.input1} onChange={handleChange} />
      <input id='input1-id' type="text" name="input2" value={formData.input2} onChange={handleChange} />
      <button id='submit-button' type="submit">Submit</button>
    </form>
  );
}
