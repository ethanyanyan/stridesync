// src/components/ui/Card/Card.tsx
import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  title?: string
  children: React.ReactNode
}

export function Card({ title, children }: Readonly<CardProps>) {
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
