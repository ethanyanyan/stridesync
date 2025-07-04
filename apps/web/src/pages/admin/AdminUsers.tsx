// src/pages/admin/AdminUsers.tsx

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Profile } from '../../types/supabase'

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([])

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role')

    if (error) {
      alert(error.message)
      return
    }
    setProfiles((data ?? []) as Profile[])
  }

  const handleRoleChange = async (id: string, role: Profile['role']) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }
    setProfiles(prev =>
      prev.map(u => (u.id === id ? { ...u, role } : u))
    )
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  return (
    <div className="container">
      <h2>Admin: Manage Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Role</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p.id}>
              <td style={{ padding: '0.5rem' }}>{p.full_name}</td>
              <td style={{ padding: '0.5rem' }}>{p.role}</td>
              <td style={{ padding: '0.5rem' }}>
                <select
                  value={p.role}
                  onChange={e => handleRoleChange(p.id, e.target.value as Profile['role'])}
                >
                  <option value="athlete">Athlete</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
