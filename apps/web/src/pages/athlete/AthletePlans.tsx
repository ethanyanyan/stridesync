// src/pages/athlete/AthletePlans.tsx
// AthletePlans: read‐only view of assigned plans (athlete only)

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import type { Plan } from '../../types/supabase'

export default function AthletePlans() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from<'plan_assignments', { training_plans: Plan[] }>('plan_assignments')
        .select('training_plans (id, name)')

      if (error) {
        console.error('Error fetching assignments:', error.message)
        return
      }

      // Each row has a training_plans array; take the first element
      const mapped: Plan[] = (data ?? []).map(pa => pa.training_plans[0])
      setPlans(mapped)
    }
    fetchPlans()
  }, [])

  return (
    <div className="container">
      <h2>Your Assigned Plans</h2>
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
