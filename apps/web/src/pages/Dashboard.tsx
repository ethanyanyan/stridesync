// src/pages/Dashboard.tsx
// Dashboard page: landing page after login/onboarding, fetches profile with joined Role

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import type { Profile } from '../types/supabase'

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) return

      // no generics here to avoid deep-type recursion
      const res = await supabase
        .from('profiles')
        .select('id, full_name, role_id, roles(name)')
        .eq('id', session.user.id)
        .single()

      if (res.error || !res.data) {
        console.error('Error fetching profile:', res.error)
        return
      }

      // cast to our Profile type
      setProfile(res.data as unknown as Profile)
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
        <nav
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {profile.roles.name === 'admin' && <Link to="/admin/users">Manage Users</Link>}
          {profile.roles.name === 'coach' && <Link to="/coach/plans">Your Plans</Link>}
          {profile.roles.name === 'athlete' && <Link to="/athlete/plans">Your Plans</Link>}
        </nav>
      )}

      <button onClick={handleSignOut} style={{ marginTop: '2rem' }}>
        Sign out
      </button>
    </div>
  )
}
