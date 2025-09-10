import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TasksManager({onSaved}){
  const [catalog, setCatalog] = useState([])
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({task_id:null, client_id:null, sell_price:'', due_date:''})

  useEffect(()=>{ fetchCatalog(); fetchClients() },[])
  async function fetchCatalog(){ const { data } = await supabase.from('tasks_catalog').select('*').order('name'); setCatalog(data||[]) }
  async function fetchClients(){ const { data } = await supabase.from('clients').select('id, client_number, full_name'); setClients(data||[]) }

  useEffect(()=>{
    if(form.task_id){
      const sel = catalog.find(c=> c.id === form.task_id)
      if(sel){ setForm(prev=> ({...prev, sell_price: sel.sell_price, cost_price: sel.cost_price})) }
    }
  },[form.task_id, catalog])

  async function save(){
    const now = new Date().toISOString()
    const due = form.due_date || now
    const payload = {
      name: catalog.find(c=> c.id === form.task_id)?.name || 'Custom',
      description: catalog.find(c=> c.id === form.task_id)?.description || '',
      client_id: form.client_id,
      start_date: now,
      due_date: due,
      cost_price: form.cost_price || 0,
      sell_price: form.sell_price || 0,
      task_catalog_id: form.task_id
    }
    const { data, error } = await supabase.from('tasks').insert(payload)
    if(error) return console.error(error)
    setForm({task_id:null, client_id:null, sell_price:'', due_date:''})
    onSaved && onSaved()
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-medium">Tasks manager</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
        <select value={form.task_id||''} onChange={e => setForm({...form, task_id: e.target.value ? Number(e.target.value) : null})}>
          <option value="">Select task or add new</option>
          {catalog.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={form.client_id||''} onChange={e => setForm({...form, client_id: e.target.value ? Number(e.target.value) : null})}>
          <option value="">Link to client (search by number)</option>
          {clients.map(c=> <option key={c.id} value={c.id}>{c.client_number} — {c.full_name}</option>)}
        </select>

        <input placeholder="Sell price" value={form.sell_price} onChange={e => setForm({...form, sell_price: e.target.value})} />
        <input type="date" value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})} />
      </div>
      <div className="mt-2">
        <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Save Task</button>
      </div>
    </div>
  )
}
