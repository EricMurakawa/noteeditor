import { EditorProvider } from '@/Contexts/EditorContext';

export default function AppProviders({ children }) {
  return (
    <EditorProvider>
      {children}
    </EditorProvider>
  )
}