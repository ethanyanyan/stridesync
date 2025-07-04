// src/components/ui/Input/Input.tsx
import React from 'react'
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: Readonly<InputProps>) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
