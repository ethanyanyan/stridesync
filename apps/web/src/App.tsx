// src/App.tsx
// Main app routing: auth, onboarding, and role‐based sections

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import type { Profile } from './types/supabase'

import AuthPage from './pages/auth/AuthPage'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import AdminUsers from './pages/admin/AdminUsers'
import CoachPlans from './pages/coach/CoachPlans'
import CreatePlan from './pages/coach/CreatePlan'
import PlanDetail from './pages/coach/PlanDetail'
import AthletePlans from './pages/athlete/AthletePlans'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [hasProfile, setHasProfile] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s)
    })
    return () => listener?.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (data && !error) {
            setProfile(data)
            setHasProfile(true)
          } else {
            setHasProfile(false)
          }
        })
    }
  }, [session])

  // Not signed in
  if (!session) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    )
  }

  // Needs onboarding
  if (!hasProfile) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Onboarding />} />
        </Routes>
      </Router>
    )
  }

  // Signed in & onboarded
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Admin */}
        {profile?.role === 'admin' && (
          <Route path="/admin/users" element={<AdminUsers />} />
        )}

        {/* Coach */}
        {profile?.role === 'coach' && (
          <>
            <Route path="/coach/plans" element={<CoachPlans />} />
            <Route path="/coach/plans/new" element={<CreatePlan />} />
            <Route path="/coach/plans/:planId" element={<PlanDetail />} />
          </>
        )}

        {/* Athlete */}
        {profile?.role === 'athlete' && (
          <Route path="/athlete/plans" element={<AthletePlans />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
