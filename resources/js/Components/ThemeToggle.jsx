import { useEffect, useState } from 'react'
import { IoSunny } from 'react-icons/io5'
import { WiMoonAltWaxingCrescent1 } from 'react-icons/wi'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches || localStorage.getItem('theme') === 'dark';
    const isLight = localStorage.getItem('theme') === 'light'

    if (prefersDark && !isLight) {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  function toggleTheme() {
    const isDark = !dark
    setDark(isDark)

    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700"
    >
      {dark ? <IoSunny size={20} /> : <WiMoonAltWaxingCrescent1 size={20} />}
    </button>
  )
}
