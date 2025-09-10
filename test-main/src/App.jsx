import React, { useState } from 'react'
    import Header from './components/Header'
    import Sidebar from './components/Sidebar'
    import Dashboard from './pages/Dashboard'

    export default function App(){
  const [lang,setLang] = useState('en')
  const [user,setUser] = useState({name:'Guest'})

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar lang={lang} />
      <div className="flex-1 flex flex-col">
        <Header user={user} lang={lang} setLang={setLang} />
        <main className="p-6 overflow-auto">
          <Dashboard lang={lang} />
        </main>
      </div>
    </div>
  )
}
