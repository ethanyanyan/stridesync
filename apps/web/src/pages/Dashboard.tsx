// src/pages/Dashboard.tsx
// Dashboard page: landing page after login/onboarding

import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h1>Welcome to StrideSync 🏃‍♂️</h1>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}
