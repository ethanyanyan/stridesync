// src/pages/Onboarding.tsx

import { useState, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import styles from './Onboarding.module.css'

export default function Onboarding() {
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return alert('User not found')

    const { error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: fullName,
        role: 'athlete'
      })

    if (error) {
      alert('Error saving profile: ' + error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Welcome to StrideSync 🎽</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setFullName(e.target.value)}
          required
        />
        <Button type="submit" className={styles.submitButton}>
          Continue
        </Button>
      </form>
    </div>
  )
}
