'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export function RichTextEditor({ content, onChange, disabled = false }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image,
    ],
    content,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('bold') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('italic') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('strike') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Strike
        </button>
        
        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          H3
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          1. List
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('blockquote') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Quote
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={addLink}
          disabled={disabled}
          className={`px-3 py-1 rounded text-sm font-medium ${
            editor.isActive('link') ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={addImage}
          disabled={disabled}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Image
        </button>
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
}
