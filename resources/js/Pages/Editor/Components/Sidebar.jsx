import { useEffect, useState } from 'react'
import { useMediaQuery } from '../Hooks/useMediaQuery'
import SidebarItem from './SidebarItem'
import clsx from 'clsx'
import { useNotes } from '@/Contexts/NoteContext'
import LoadingBar from '@/Components/UI/LoadingBar'
import { router } from '@inertiajs/react'
import { FiEdit } from 'react-icons/fi'
import { LuNotebookText } from 'react-icons/lu'
import { RiArrowLeftRightFill } from 'react-icons/ri'

export default function Sidebar({onCollapseChange}) {
  const {
    notes,
    setNotes,
    loadingNotes,
    setLoadingNotes
  } = useNotes()

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [collapsed, setCollapsed] = useState(!isDesktop)

  useEffect(() => {
    getItems(0)
  }, []);

  useEffect(() => {
    setCollapsed(!isDesktop)
  }, [isDesktop])

  useEffect(() => {
    onCollapseChange(collapsed)
  }, [collapsed, onCollapseChange])

  const getItems = async (offset) => {
    try {
      setLoadingNotes(true)

      const params = {
        select: ['id', 'title', 'updated_at']
      }

      const { data } = await axios.get(`api/notes`, { params });

      setNotes(data)
    } finally {
      setLoadingNotes(false)
    }
  }

  const handleSelect = (id) => {
    router.visit(id)
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
          label='Nova nota'
          collapsed={collapsed}
          icon={<FiEdit size={18} />}
          onSelect={() => router.visit('/')}
        />

        {/* Menu */}
        <h2>Notas</h2>
        <nav className='flex flex-col gap-1'>
          {notes.map(note => (
            <SidebarItem
              key={note.id}
              label={note.title}
              collapsed={collapsed}
              icon={<LuNotebookText />}
              onSelect={() => handleSelect(note.id)}
            />
          ))}
        </nav>

        {!collapsed && (
          <div className='mt-auto px-2 text-xs text-zinc-400'>
            Editor v1.0
          </div>
        )}
      </div>
    </aside>
  )
}
