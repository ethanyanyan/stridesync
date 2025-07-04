// src/components/ui/Navbar/Navbar.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export interface NavItem { label: string; to: string }

export function Navbar({ items }: Readonly<{ items: NavItem[] }>) {
  const { pathname } = useLocation()
  return (
    <nav className={styles.nav}>
      {items.map(i => (
        <Link
          key={i.to}
          to={i.to}
          className={pathname.startsWith(i.to) ? styles.active : ''}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  )
}
