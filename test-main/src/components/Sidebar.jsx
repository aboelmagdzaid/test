import React from 'react'
export default function Sidebar({lang}){
  const tabs = [
    {key:'dashboard', label: lang === 'ar' ? 'الرئيسية' : 'Dashboard'},
    {key:'tasks', label: lang === 'ar' ? 'المهام' : 'Tasks'},
    {key:'clients', label: lang === 'ar' ? 'العملاء' : 'Clients'},
    {key:'settings', label: lang === 'ar' ? 'الإعدادات' : 'Settings'},
  ]
  return (
    <aside className="w-72 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">aboelmagdzaid</h2>
      <nav className="flex flex-col gap-2">
        {tabs.map(t=> <button key={t.key} className="text-left p-2 rounded hover:bg-gray-100">{t.label}</button>)}
      </nav>
    </aside>
  )
}
