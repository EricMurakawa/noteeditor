import clsx from 'clsx'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

export const DropdownContext = createContext(null)

export function Dropdown({ children, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen, align }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ children }) {
  const { open, setOpen } = useContext(DropdownContext)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="inline-flex items-center gap-2 rounded-md p-2 text-sm"
    >
      {children}
    </button>
  )
}

export function DropdownMenu({ children }) {
  const { open, align } = useContext(DropdownContext)

  if (!open) return null

  return (
    <div className={clsx(
      'absolute mt-2 w-44 rounded-md bg-white shadow',
      'dark:bg-zinc-700',
      align === 'right' ? 'right-0' : 'left-0'
    )}>
      <ul className="py-1">{children}</ul>
    </div>
  )
}
