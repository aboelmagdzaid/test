import React from 'react'
import TasksPage from '../components/TasksPage'
import ClientsPage from '../components/ClientsPage'
import SettingsPage from '../components/SettingsPage'

export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 gap-6">
      <TasksPage />
      <ClientsPage />
      <SettingsPage />
    </div>
  )
}
