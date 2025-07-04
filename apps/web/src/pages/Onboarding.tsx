// src/pages/Onboarding.tsx
// Onboarding page: collect full name and role before entering the app

import { useState, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './Onboarding.module.css'  // page-specific styles

export default function Onboarding() {
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'coach'|'athlete'>('athlete')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert('User not found')

    const { error } = await supabase
      .from('profiles')
      .insert({ id: user.id, full_name: fullName, role })

    if (error) {
      alert('Error saving profile: ' + error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Welcome to StrideSync 🎽</h2>
      <p>Please complete your profile to get started:</p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setFullName(e.target.value)}
          required
        />

        <Select
          label="Role"
          value={role}
          onChange={(e: { target: { value: string } }) => setRole(e.target.value as 'coach'|'athlete')}
        >
          <option value="coach">Coach</option>
          <option value="athlete">Athlete</option>
        </Select>

        <Button type="submit" className={styles.submitButton}>
          Continue
        </Button>
      </form>
    </div>
)
}
