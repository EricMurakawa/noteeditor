import { createContext, useState, useContext } from 'react';

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [originalTitle, setOriginalTitle] = useState('')
  const [inputTitle, setInputTitle] = useState('')

  const [notes, setNotes] = useState([])
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [loaded, setLoaded] = useState(false)

  async function fetchNotes() {
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

  async function removeNote(id) {
    try {
      setLoadingNotes(true)

      await axios.delete(`/api/notes/${id}`)

      setNotes(prev => prev.filter(n => n.id !== id))
    } finally {
      setLoadingNotes(false)
    }
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

  return (
    <EditorContext.Provider value={{
        inputTitle,
        setInputTitle,
        originalTitle,
        setOriginalTitle,

        notes,
        setNotes,
        fetchNotes,
        addNote,
        removeNote,
        updateNote,
        orderNotes,
        loadingNotes,
        setLoadingNotes,
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => useContext(EditorContext);
