import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';

import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdOutlineRedo,
  MdStrikethroughS,
  MdUndo
} from 'react-icons/md';

import ThemeToggle from '@/Components/ThemeToggle';
import ToolbarButton from './ToolbarButton';
import ToolbarDivider from './ToolbarDivider';

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor },
        );
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className='flex flex-row justify-center items-center flex-wrap gap-[5px] w-full p-2 border-b border-[rgb(209,210,211)]'
      ref={toolbarRef}
    >
      <ThemeToggle />

      <ToolbarDivider />

      <ToolbarButton
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
        ariaLabel='Undo'
      >
        <MdUndo size={20} />
      </ToolbarButton>

      <ToolbarButton
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        ariaLabel='Redo'
      >
        <MdOutlineRedo size={20} />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        active={isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        ariaLabel='Format Bold'
      >
        <MdFormatBold size={20} />
      </ToolbarButton>

      <ToolbarButton
        active={isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        ariaLabel='Format Italics'
      >
        <MdFormatItalic size={20} />
      </ToolbarButton>

      <ToolbarButton
        active={isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        ariaLabel='Format Underline'
      >
        <MdFormatUnderlined size={20} />
      </ToolbarButton>

      <ToolbarButton
        active={isStrikethrough}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        ariaLabel='Format Strikethrough'
      >
        <MdStrikethroughS size={20} />
      </ToolbarButton>

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        ariaLabel='Left Align'
      >
        <MdFormatAlignLeft size={20} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        ariaLabel='Center Align'
      >
        <MdFormatAlignCenter size={20} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        ariaLabel='Right Align'
      >
        <MdFormatAlignRight size={20} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        ariaLabel='Justify Align'
      >
        <MdFormatAlignJustify size={20} />
      </ToolbarButton>
    </div>
  );
}
