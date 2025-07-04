import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Readonly<ButtonProps>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
