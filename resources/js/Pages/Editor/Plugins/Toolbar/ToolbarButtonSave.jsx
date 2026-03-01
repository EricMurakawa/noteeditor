import { useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import ToolbarButton from './ToolbarButton'
import { VscSave } from 'react-icons/vsc'
import { COMMAND_PRIORITY_LOW, KEY_DOWN_COMMAND } from 'lexical'
import { router, usePage } from '@inertiajs/react'
import { useNotes } from '@/Contexts/NoteContext'
import { useEditor } from '@/Contexts/EditorContext'

export default function ToolbarButtonSave({ style }) {
  const [editor] = useLexicalComposerContext()
  const [isChanged, setIsChanged] = useState(false)
  const { note } = usePage().props;
  const { addNote, updateNote } = useNotes()
  const { inputTitle, originalTitle, setOriginalTitle } = useEditor()
  const inputTitleRef = useRef(inputTitle)
  const lastContentRef = useRef(JSON.stringify(editor.getEditorState().toJSON()))

  useEffect(() => {
    inputTitleRef.current = inputTitle
    setIsChanged(originalTitle !== inputTitle)
  }, [inputTitle])

  useEffect(() => {
    // Salva com ctrl + s
    editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          handleSave();

          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return editor.registerUpdateListener(({ editorState, dirtyElements, dirtyLeaves }) => {
      // Se dirtyElements e dirtyLeaves estiverem vazios,
      // significa que apenas a seleção ou o foco mudaram.
      if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
        return
      }

      const currentContent = JSON.stringify(editorState.toJSON())
      setIsChanged(currentContent !== lastContentRef.current)
    })
  }, [editor])

  const handleSave = async () => {
    const editorState = editor.getEditorState().toJSON()

    if (editorState === lastContentRef.current) {
      return
    }

    try {
      if (note) {
        const { data } = await axios.put(`api/notes/${note.id}`, {
          title: inputTitleRef.current,
          content: editorState
        });

        updateNote(data)
        setOriginalTitle(data.title)
      } else {
        const {data} = await axios.post(`/api/notes`, {
          title: inputTitleRef.current,
          content: editorState,
        })

        if (data?.id) {
          addNote(data)
          setOriginalTitle(data.title)
          router.visit(data.id)
        }
      }

      lastContentRef.current = JSON.stringify(editorState)
      setIsChanged(false)
    } catch (error) {
      console.error('Erro ao salvar', error)
      alert(error?.response?.data?.message || 'Erro ao salvar.')
    }
  }

  return (
    <ToolbarButton
      ariaLabel="Salvar"
      style={style}
      disabled={!isChanged}
      onClick={handleSave}
    >
      <VscSave size={20} />
    </ToolbarButton>
  )
}
