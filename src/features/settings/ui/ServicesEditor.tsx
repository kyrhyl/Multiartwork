import React from 'react';

interface Service {
  title: string;
  description: string;
  icon?: string;
}

interface ServicesEditorProps {
  services: Service[];
  onChange: (services: Service[]) => void;
  disabled?: boolean;
}

export function ServicesEditor({ services, onChange, disabled = false }: ServicesEditorProps) {
  const handleAdd = () => {
    onChange([...services, { title: '', description: '', icon: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(services.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Services</label>
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add Service
        </button>
      </div>

      {services.length === 0 && (
        <p className="text-sm text-gray-500 italic">No services added yet. Click "Add Service" to get started.</p>
      )}

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-700">Service {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>

            <input
              type="text"
              value={service.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              placeholder="Service title"
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />

            <textarea
              value={service.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Service description"
              rows={3}
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 resize-vertical"
            />

            <input
              type="text"
              value={service.icon || ''}
              onChange={(e) => handleChange(index, 'icon', e.target.value)}
              placeholder="Icon name (optional)"
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
