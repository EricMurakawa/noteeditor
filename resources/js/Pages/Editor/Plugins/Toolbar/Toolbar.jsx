import { useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';
import { RiH1 } from 'react-icons/ri';

import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

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

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@/Components/UI/Dropdown'

import ThemeToggle from '@/Components/ThemeToggle';
import ToolbarButton from './ToolbarButton';
import ToolbarDivider from './ToolbarDivider';
import ImagePlugin from '../ImagePlugin/ImagePlugin';
import { useToolbar } from '../../Hooks/useToolbar';
import ToolbarButtonSave from './ToolbarButtonSave';

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);

  const {
    canUndo,
    canRedo,
    isBold,
    isItalic,
    isUnderline,
    isStrikethrough,
    blockType,
    formatHeading,
    formatParagraph,
    HEADINGS,
  } = useToolbar();

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 left-0 z-100 flex flex-row justify-center items-center flex-wrap gap-[5px] w-full p-2 border-b border-[rgb(209,210,211)] bg-white',
        'dark:bg-zinc-900',
      )}
      ref={toolbarRef}
    >
      <ToolbarButtonSave />

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

      <Dropdown align="right">
        <DropdownTrigger>
          <RiH1 size={16}/>
        </DropdownTrigger>

        <DropdownMenu>
          {HEADINGS.map((heading) => (
            <DropdownItem
              key={heading}
              active={blockType === heading}
              onClick={() => formatHeading(heading)}
            >
              { heading.toLocaleUpperCase() }
            </DropdownItem>
          ))}

          <DropdownItem
            active={blockType === 'paragraph'}
            onClick={formatParagraph}
          >
            Texto Normal (P)
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

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

      <ToolbarDivider />

      <ImagePlugin />
    </div>
  );
}
