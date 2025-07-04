// src/pages/coach/PlanDetail.tsx

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import type { SessionEntry } from '../../types/supabase'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'                   // named import for locale
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
})

export default function PlanDetail() {
  const { planId } = useParams<{ planId: string }>()
  const [sessions, setSessions] = useState<SessionEntry[]>([])
  const [date, setDate] = useState('')
  const [type, setType] = useState('Easy')
  const [distance, setDistance] = useState<number>(0)

  // Fetch sessions for this plan
  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('training_sessions')          // no generic here to avoid deep-type issues
      .select('*')
      .eq('plan_id', planId)

    if (error) {
      console.error('Error fetching sessions:', error)
      return
    }

    // Cast to our SessionEntry type
    setSessions((data ?? []) as SessionEntry[])
  }

  useEffect(() => {
    if (planId) fetchSessions()
  }, [planId])

  // Add a new session
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase
      .from('training_sessions')
      .insert({
        plan_id: planId!,
        date,
        type,
        distance_km: distance,
      })

    // reset form & refresh list
    setDate('')
    setType('Easy')
    setDistance(0)
    fetchSessions()
  }

  // Map sessions to calendar events
  const events = sessions.map(s => ({
    start: new Date(s.date),
    end: new Date(s.date),
    title: `${s.type} (${s.distance_km}km)`,
    allDay: true,
  }))

  return (
    <div className="container">
      <h2>Plan Sessions</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: '2rem' }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Easy</option>
          <option>Interval</option>
          <option>Long Run</option>
        </select>
        <input
          type="number"
          value={distance}
          onChange={e => setDistance(+e.target.value)}
          placeholder="Distance (km)"
          required
        />
        <button type="submit">Add Session</button>
      </form>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}
