import { useContext } from 'react'
import { DropdownContext } from './Dropdown'
import clsx from 'clsx'

export default function DropdownItem({ children, onClick, active }) {
  const { setOpen } = useContext(DropdownContext)

  function handleClick() {
    onClick?.()
    setOpen(false)
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className={clsx(
          'block w-full px-4 py-2 text-left text-sm hover:bg-gray-100',
          'dark:hover:bg-zinc-600',
          active && 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
        )}
      >
        {children}
      </button>
    </li>
  )
}
