// src/components/layout/AppLayout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, type NavItem } from '../ui/Navbar/Navbar'

export interface AppLayoutProps {
  role: 'admin' | 'coach' | 'athlete'
}

export function AppLayout({ role }: Readonly<AppLayoutProps>) {
  const items: NavItem[] = []

  if (role === 'admin') {
    items.push({ label: 'Manage Users', to: '/admin/users' })
  }
  if (role === 'coach') {
    items.push({ label: 'Your Plans', to: '/coach/plans' })
  }
  if (role === 'athlete') {
    items.push({ label: 'Your Plans', to: '/athlete/plans' })
  }

  return (
    <>
      <Navbar items={items} />
      <main style={{ padding: 'var(--spacing-lg)' }}>
        <Outlet />
      </main>
    </>
  )
}
