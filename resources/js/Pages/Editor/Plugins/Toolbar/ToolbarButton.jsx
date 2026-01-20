import clsx from 'clsx'

export default function ToolbarButton({
  children,
  active = false,
  disabled = false,
  onClick,
  ariaLabel,
  style,
}) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center p-2 rounded-[10px] transition select-none hover:bg-blue-100',
        'dark:hover:bg-zinc-700',
        active && 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
        disabled && 'opacity-40',
        !disabled && 'cursor-pointer',
        style,
      )}
    >
      {children}
    </button>
  )
}
