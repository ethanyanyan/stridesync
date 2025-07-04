// src/components/ui/Button/Button.tsx
import React from 'react'
import styles from './Button.module.css'
import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
