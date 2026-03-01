import { createContext, useState, useContext } from 'react';

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [originalTitle, setOriginalTitle] = useState('')
  const [inputTitle, setInputTitle] = useState('')

  return (
    <EditorContext.Provider value={{
        inputTitle,
        setInputTitle,
        originalTitle,
        setOriginalTitle
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => useContext(EditorContext);
