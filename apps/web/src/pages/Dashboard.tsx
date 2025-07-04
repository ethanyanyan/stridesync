// src/pages/Dashboard.tsx
// Dashboard page: landing page after login/onboarding, fetches id for Profile

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import type { Profile } from '../types/supabase'

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (!session) return

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
        return
      }

      setProfile(data as Profile)
    }

    fetchProfile()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h1>
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ''} to StrideSync 🏃‍♂️
      </h1>

      {profile && (
        <nav style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {profile.role === 'admin' && <Link to="/admin/users">Manage Users</Link>}
          {profile.role === 'coach' && <Link to="/coach/plans">Your Plans</Link>}
          {profile.role === 'athlete' && <Link to="/athlete/plans">Your Plans</Link>}
        </nav>
      )}

      <Button onClick={handleSignOut} style={{ marginTop: '2rem' }}>
        Sign out
      </Button>
    </div>
  )
}
