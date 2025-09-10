import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ClientsPage(){
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({})
  useEffect(()=>{ fetchClients() },[])
  async function fetchClients(){ const { data } = await supabase.from('clients').select('*').order('client_number'); setClients(data||[]) }
  async function save(){ const { data, error } = await supabase.from('clients').upsert(form).select(); if(error) return console.error(error); setForm({}); fetchClients() }
  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Clients</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input placeholder="Client number" value={form.client_number||''} onChange={e=> setForm({...form, client_number: e.target.value})} />
        <input placeholder="Full name" value={form.full_name||''} onChange={e=> setForm({...form, full_name: e.target.value})} />
        <input placeholder="Mobile" value={form.mobile||''} onChange={e=> setForm({...form, mobile: e.target.value})} />
      </div>
      <div className="mt-2">
        <button onClick={save} className="px-3 py-1 bg-green-600 text-white rounded">Save Client</button>
      </div>
      <div className="mt-4">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50"><th className="p-2">Client #</th><th className="p-2">Name</th><th className="p-2">Mobile</th></tr></thead>
          <tbody>
            {clients.map(c=> (
              <tr key={c.id} className="border-t"><td className="p-2">{c.client_number}</td><td className="p-2">{c.full_name}</td><td className="p-2">{c.mobile}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
