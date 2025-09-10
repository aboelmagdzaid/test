import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import TasksManager from './TasksManager'

export default function TasksPage(){
  const [tasks, setTasks] = useState([])
  useEffect(()=>{ fetchUpcoming() },[])
  async function fetchUpcoming(){
    const { data, error } = await supabase
      .from('tasks')
      .select('id, name, description, client_id, start_date, due_date, cost_price, sell_price')
      .order('start_date', {ascending:false})
      .limit(50)
    if(error) console.error(error)
    else setTasks(data || [])
  }
  return (
    <section className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Upcoming tasks</h3>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="p-2">Task name</th>
              <th className="p-2">Task description</th>
              <th className="p-2">Client</th>
              <th className="p-2">Start date</th>
              <th className="p-2">Due date</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Sell</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t=> (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.description}</td>
                <td className="p-2">{t.client_id}</td>
                <td className="p-2">{t.start_date?.slice(0,10)}</td>
                <td className="p-2">{t.due_date?.slice(0,10)}</td>
                <td className="p-2">{t.cost_price}</td>
                <td className="p-2">{t.sell_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <TasksManager onSaved={fetchUpcoming} />
      </div>
    </section>
  )
}
