import ToolbarButton from './ToolbarButton'
import { MdImage } from 'react-icons/md'
import { useRef } from 'react'

export default function ToolbarButtonImage({ onChange }) {
  const fileInputRef = useRef(null)

  return (
    <>
      <ToolbarButton
        ariaLabel="Inserir imagem"
        onClick={() => fileInputRef.current.click()}
      >
        <MdImage size={20} />
      </ToolbarButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onChange}
      />
    </>
  )
}
