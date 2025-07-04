// src/pages/AuthPage.tsx
// AuthPage: Supabase‐powered sign in / sign up

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabaseClient'

export default function AuthPage() {
  return (
    <div className="container" style={{ maxWidth: 400, paddingTop: '4rem' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        redirectTo={window.location.origin}
      />
    </div>
  )
}
