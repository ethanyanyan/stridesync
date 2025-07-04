// src/App.tsx
// Main app routing: auth, onboarding, and role‐based sections with AppLayout

import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
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
import { AppLayout } from './components/layout/AppLayout'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen for auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s)
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  // Fetch profile (with joined role) once signed in
  useEffect(() => {
    if (!session) {
      setProfile(null)
      return
    }
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        // select role relationship via the foreign key
        .select('id, full_name, role_id, roles(name)')
        .eq('id', session.user.id)
        .single()
      if (error || !data) {
        console.error('fetchProfile error', error)
        setProfile(null)
      } else {
        // data.roles.name is the string role
        setProfile(data as unknown as Profile)
      }
    }
    fetchProfile()
  }, [session])

  if (loading) {
    return <div>Loading…</div>
  }

  return (
    <Router>
      <Routes>
        {/* Not signed in */}
        {!session && <Route path="*" element={<AuthPage />} />}

        {/* Signed in but not onboarded */}
        {session && !profile && (
          <Route path="*" element={<Onboarding />} />
        )}

        {/* Signed in & onboarded: nested under AppLayout */}
        {session && profile && (
          <Route element={<AppLayout role={profile.roles.name} />}>
            <Route path="/" element={<Dashboard />} />

            {profile.roles.name === 'admin' && (
              <Route path="/admin/users" element={<AdminUsers />} />
            )}

            {profile.roles.name === 'coach' && (
              <>
                <Route path="/coach/plans" element={<CoachPlans />} />
                <Route path="/coach/plans/new" element={<CreatePlan />} />
                <Route
                  path="/coach/plans/:planId"
                  element={<PlanDetail />}
                />
              </>
            )}

            {profile.roles.name === 'athlete' && (
              <Route
                path="/athlete/plans"
                element={<AthletePlans />}
              />
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  )
}
