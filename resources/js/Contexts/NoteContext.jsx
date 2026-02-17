import { createContext, useContext, useState, useEffect } from 'react'

const NoteContext = createContext()

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [loaded, setLoaded] = useState(false)

  async function loadNotes() {
    if (loaded) return

    try {
      setLoadingNotes(true)

      const { data } = await axios.get('/api/notes', {
        params: { select: ['id', 'title', 'updated_at'] }
      })

      setNotes(data)
      setLoaded(true)
    } finally {
      setLoadingNotes(false)
    }
  }

  function addNote(note) {
    setNotes(prev => [note, ...prev])
  }

  function removeNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  function updateNote(updated) {
    setNotes(prev =>
      prev.map(n => n.id === updated.id ? updated : n)
    )

    orderNotes()
  }

  function orderNotes(key = 'updated_at') {
    setNotes(prev =>
      [...prev].sort(
        (a, b) => new Date(b[key]) - new Date(a[key])
      )
    );
  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        removeNote,
        updateNote,
        orderNotes,
        loadingNotes,
        setLoadingNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export function useNotes() {
  return useContext(NoteContext)
}
