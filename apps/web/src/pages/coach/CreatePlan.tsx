// src/pages/CreatePlan.tsx
// CreatePlan: form to create a new training plan (coach only)

import { useState, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

export default function CreatePlan() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return alert('Not authenticated')

    const { error } = await supabase
      .from('training_plans')
      .insert({ name, coach_id: user.id })
    if (error) return alert(error.message)

    navigate('/coach/plans')
  }

  return (
    <div className="container">
      <h2>Create New Plan</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Plan Name"
          value={name}
          onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)}
          required
        />
        <Button type="submit" style={{ marginTop: '1rem' }}>
          Create Plan
        </Button>
      </form>
    </div>
  )
}
