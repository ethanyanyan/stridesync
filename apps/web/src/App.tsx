// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [hasProfile, setHasProfile] = useState<boolean | null>(null)

  useEffect(() => {
    // Fetch current session once
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (session) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          setHasProfile(!!data && !error)
        })
    }
  }, [session])

  return (
    <Router>
      <Routes>
        {!session ? (
          <Route path="*" element={<AuthPage />} />
        ) : hasProfile === false ? (
          <Route path="*" element={<Onboarding />} />
        ) : (
          <Route path="*" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
