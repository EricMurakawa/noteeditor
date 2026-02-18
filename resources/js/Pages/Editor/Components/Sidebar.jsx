import { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { useMediaQuery } from '@/Hooks/useMediaQuery'
import { useNotes } from '@/Contexts/NoteContext'
import LoadingBar from '@/Components/UI/LoadingBar'
import SidebarItem from './SidebarItem'
import { FiEdit } from 'react-icons/fi'
import { LuNotebookText } from 'react-icons/lu'
import { RiArrowLeftRightFill } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'

export default function Sidebar({onCollapseChange}) {
  const {
    notes,
    loadingNotes,
    removeNote,
  } = useNotes()

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [collapsed, setCollapsed] = useState(!isDesktop)
  const { url, props } = usePage()

  useEffect(() => {
    setCollapsed(!isDesktop)
  }, [isDesktop])

  useEffect(() => {
    onCollapseChange(collapsed)
  }, [collapsed, onCollapseChange])

  function handleDelete(e, note) {
    if (! confirm(`Tem certeza que quer deletar ${note.title}`)) {
      return
    }

    e.preventDefault()
    e.stopPropagation()
    removeNote(note.id)

    if (props?.note?.id === note.id) {
      router.visit('/')
    }
  }

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-20 h-[100dvh] pt-1 border-r border-zinc-200 bg-zinc-50',
        'dark:border-zinc-800 dark:bg-zinc-950',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {loadingNotes && <LoadingBar />}
      <div className='flex h-full flex-col px-2 py-4'>
        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            'mb-6 flex h-10 w-10 items-center justify-center rounded-md ml-auto',
            'hover:bg-zinc-200 dark:hover:bg-zinc-800',
          )}
        >
          <RiArrowLeftRightFill />
        </button>
        <SidebarItem
          link={'/'}
          label='Nova nota'
          collapsed={collapsed}
          icon={<FiEdit size={18} />}
        />

        {/* Menu */}
        {notes.length > 0 && (
          <>
            <h2>Notas</h2>
            <nav className='flex flex-col gap-1'>
              {notes.map(note => (
                <SidebarItem
                  key={note.id}
                  link={`/${note.id}`}
                  label={note.title}
                  collapsed={collapsed}
                  icon={<LuNotebookText />}
                  active={url === `/${note.id}`}
                  rightAction={
                    <button
                      onClick={(e) => {handleDelete(e, note)}}
                      className="opacity-60 hover:opacity-100 cursor-pointer"
                    >
                      <AiTwotoneDelete />
                    </button>
                  }
                />
              ))}
            </nav>
          </>
        )}

        {!collapsed && (
          <div className='mt-auto px-2 text-xs text-zinc-400'>
            Editor v1.0
          </div>
        )}
      </div>
    </aside>
  )
}
