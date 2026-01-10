import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes } from 'lexical'
import { $createImageNode } from '../../Nodes/ImageNode'
import ToolbarButtonImage from '../Toolbar/ToolbarButtonImage'


export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext()

  function handleSelectImage(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const src = reader.result

      editor.update(() => {
        const imageNode = $createImageNode(src, file.name)
        $insertNodes([imageNode])
      })
    }

    reader.readAsDataURL(file)
  }

  return <ToolbarButtonImage onChange={handleSelectImage} />
}
