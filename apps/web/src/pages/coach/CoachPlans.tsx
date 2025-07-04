// src/pages/coach/CoachPlans.tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import type { Plan } from '../../types/supabase'

export default function CoachPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    supabase
      .from<'training_plans', Plan>('training_plans')
      .select('id, name')
      .then(({ data }) => setPlans(data ?? []))
  }, [])

  return (
    <div className="container">
      <h2>Your Training Plans</h2>
      <button onClick={() => navigate('/coach/plans/new')}>+ New Plan</button>
      <ul>
        {plans.map(p => (
          <li key={p.id}>
            <Link to={`/coach/plans/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
