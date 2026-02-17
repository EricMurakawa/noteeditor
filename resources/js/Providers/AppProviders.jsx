import { NoteProvider } from '@/Contexts/NoteContext';

export default function AppProviders({ children }) {
  return (
    <NoteProvider>
      {children}
    </NoteProvider>
  )
}