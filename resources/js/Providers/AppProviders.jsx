import { NoteProvider } from '@/Contexts/NoteContext';
import { EditorProvider } from '@/Contexts/EditorContext';

export default function AppProviders({ children }) {
  return (
    <EditorProvider>
      <NoteProvider>
        {children}
      </NoteProvider>
    </EditorProvider>
  )
}