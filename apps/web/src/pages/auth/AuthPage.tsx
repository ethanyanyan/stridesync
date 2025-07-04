// src/pages/AuthPage.tsx

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabaseClient'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  )
}
