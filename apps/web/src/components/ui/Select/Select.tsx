import React from 'react';
import styles from './Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, children, ...props }: Readonly<SelectProps>) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select className={styles.select} {...props}>
        {children}
      </select>
    </div>
  );
}
