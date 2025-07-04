import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: Readonly<InputProps>) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}
