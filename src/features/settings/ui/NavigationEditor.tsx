'use client';

import React from 'react';
import { InputField } from '@/shared/ui/FormFields';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationEditorProps {
  navigationItems: NavigationItem[];
  onChange: (items: NavigationItem[]) => void;
  disabled?: boolean;
}

export function NavigationEditor({ navigationItems, onChange, disabled = false }: NavigationEditorProps) {
  const handleItemChange = (index: number, field: 'label' | 'href', value: string) => {
    const updated = [...navigationItems];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...navigationItems, { label: '', href: '/' }]);
  };

  const removeItem = (index: number) => {
    onChange(navigationItems.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === navigationItems.length - 1)
    ) {
      return;
    }

    const updated = [...navigationItems];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {navigationItems.map((item, index) => (
        <div
          key={index}
          className="flex gap-3 items-end p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div className="flex-1">
            <InputField
              label="Label"
              name={`nav-label-${index}`}
              value={item.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleItemChange(index, 'label', e.target.value)
              }
              disabled={disabled}
              placeholder="Home"
            />
          </div>

          <div className="flex-1">
            <InputField
              label="Link (Path)"
              name={`nav-href-${index}`}
              value={item.href}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleItemChange(index, 'href', e.target.value)
              }
              disabled={disabled}
              placeholder="/about"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveItem(index, 'up')}
              disabled={disabled || index === 0}
              className="px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
              title="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveItem(index, 'down')}
              disabled={disabled || index === navigationItems.length - 1}
              className="px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
              title="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => removeItem(index)}
              disabled={disabled}
              className="px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
              title="Remove"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        disabled={disabled}
        className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + Add Navigation Item
      </button>
    </div>
  );
}
