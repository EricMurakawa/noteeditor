import { useContext } from 'react'
import { DropdownContext } from './Dropdown'

export default function DropdownItem({ children, onClick, danger }) {
  const { setOpen } = useContext(DropdownContext)

  function handleClick() {
    onClick?.()
    setOpen(false)
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100
          ${danger ? 'text-red-600' : 'text-gray-700'}`}
      >
        {children}
      </button>
    </li>
  )
}
