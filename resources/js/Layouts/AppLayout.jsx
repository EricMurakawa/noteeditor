import { NoteProvider } from '../Contexts/NoteContext';

export default function AppLayout({ children }) {
  return (
    <NoteProvider>
      {children}
    </NoteProvider>
  )
}
