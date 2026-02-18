import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function SidebarItem({
  link,
  label,
  collapsed,
  icon,
  active,
  rightAction,
}) {
  return (
    <Link
      href={link}
      className={clsx(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm',
        'hover:bg-zinc-200 dark:hover:bg-zinc-800',
        active ? 'bg-zinc-300' : '',
      )}
    >
      <span className='text-base'>{ icon }</span>
      {/* { !collapsed && <span>{label || 'Sem título'}</span> } */}
      <span
        className={clsx(
          'overflow-hidden whitespace-nowrap transition-all duration-300',
          'flex w-full',
          collapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3',
        )}
      >
        { label }
        { rightAction && <div className='ml-auto'>{rightAction}</div> }
      </span>
    </Link>
  )
}
