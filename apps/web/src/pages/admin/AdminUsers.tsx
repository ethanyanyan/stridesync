// src/pages/admin/AdminUsers.tsx
// AdminUsers: manage user roles via roles table and role_id FK

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { Profile, Role } from '../../types/supabase'

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [roles, setRoles] = useState<Role[]>([])

  // fetch all available roles (id & name)
  useEffect(() => {
    supabase
      .from<'roles', Role>('roles')
      .select('id, name')
      .then(({ data, error }) => {
        if (error) return alert(error.message)
        setRoles(data ?? [])
      })
  }, [])

  // fetch all user profiles with their current role
  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from<'profiles', Profile & { roles: Role }>('profiles')
      .select('id, full_name, role_id, roles(name)')
    if (error) return alert(error.message)
    setProfiles(data as unknown as Profile[])
  }

  const handleRoleChange = async (userId: string, newRoleId: number) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role_id: newRoleId })
      .eq('id', userId)

    if (error) return alert(error.message)

    // update local state: find the Role object by id
    const newRole = roles.find(r => r.id === newRoleId)
    if (!newRole) return

    setProfiles(prev =>
      prev.map(p =>
        p.id === userId
          ? { ...p, role_id: newRoleId, roles: newRole }
          : p
      )
    )
  }

  useEffect(() => {
    fetchProfiles()
  }, [roles]) // fetch profiles after roles load

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
              <td style={{ padding: '0.5rem' }}>{p.roles.name}</td>
              <td style={{ padding: '0.5rem' }}>
                <select
                  value={p.role_id}
                  onChange={e => handleRoleChange(p.id, +e.target.value)}
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
