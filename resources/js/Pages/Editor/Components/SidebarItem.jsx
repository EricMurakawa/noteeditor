import clsx from 'clsx';

export default function SidebarItem({ label, collapsed, onSelect, icon }) {
  return (
    <button
      className={clsx(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm',
        'hover:bg-zinc-200 dark:hover:bg-zinc-800',
      )}
      onClick={() => onSelect()}
    >
      <span className='text-base'>{ icon }</span>
      {/* { !collapsed && <span>{label || 'Sem título'}</span> } */}
      <span
        className={clsx(
          'overflow-hidden whitespace-nowrap transition-all duration-300',
          collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
        )}
      >
        {label || 'Sem título'}
      </span>
    </button>
  )
}
