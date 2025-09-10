import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SettingsPage(){
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  useEffect(()=>{ fetchRoles(); fetchUsers() },[])
  async function fetchRoles(){ const { data } = await supabase.from('roles').select('*'); setRoles(data||[]) }
  async function fetchUsers(){ const { data } = await supabase.from('users').select('*'); setUsers(data||[]) }
  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="text-lg">Settings</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Roles</h4>
          <ul>{roles.map(r=> <li key={r.id}>{r.name}</li>)}</ul>
        </div>
        <div>
          <h4 className="font-medium">Users</h4>
          <ul>{users.map(u=> <li key={u.id}>{u.name} ({u.username})</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
