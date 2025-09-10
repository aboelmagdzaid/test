import React from 'react'
    import dayjs from 'dayjs'

    export default function Header({user, lang, setLang}){
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div>
        <div className="text-sm text-gray-500">{lang === 'ar' ? 'أهلاً' : 'Welcome'}, <strong>{user.name}</strong></div>
        <div className="text-xs text-gray-400">{dayjs().format('YYYY-MM-DD HH:mm')}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=> setLang(lang === 'ar' ? 'en' : 'ar')} className="px-3 py-1 border rounded">{lang === 'ar' ? 'EN' : 'AR'}</button>
      </div>
    </header>
  )
}
