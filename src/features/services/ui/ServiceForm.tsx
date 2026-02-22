'use client';

import React, { useState, useEffect } from 'react';
import { ImageUpload } from '@/shared/ui/ImageUpload';

interface Album {
  _id: string;
  title: string;
  coverImageUrl?: string;
  isLinked?: boolean;
}

interface ServiceFormData {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  linkedAlbumIds: string[];
}

interface ServiceFormProps {
  initialData?: {
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    linkedAlbums?: { _id: string; title: string; coverImageUrl?: string }[];
  };
  availableAlbums?: Album[];
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
}

export function ServiceForm({ initialData, availableAlbums = [], onSubmit, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    icon: initialData?.icon || '',
    imageUrl: initialData?.imageUrl || '',
    linkedAlbumIds: initialData?.linkedAlbums?.map(a => a._id) || [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'albums'>('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const toggleAlbum = (albumId: string) => {
    setFormData(prev => ({
      ...prev,
      linkedAlbumIds: prev.linkedAlbumIds.includes(albumId)
        ? prev.linkedAlbumIds.filter(id => id !== albumId)
        : [...prev.linkedAlbumIds, albumId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'details'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Service Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('albums')}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'albums'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Linked Albums ({formData.linkedAlbumIds.length})
        </button>
      </div>

      {activeTab === 'details' ? (
        <div className="space-y-6">
          {/* Service Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Profile Image (Optional)
            </label>
            <ImageUpload
              label="Upload Image"
              currentImage={formData.imageUrl}
              onUpload={(url: string) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />
            <p className="mt-1 text-sm text-gray-500">
              This image will be displayed on the services page
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              placeholder="e.g., Signage Solutions"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="Describe this service..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon (optional)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., 🎯 or icon name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter an emoji (e.g., 🎯) or icon identifier
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Link Portfolio Albums</strong><br />
              Select which portfolio albums should be associated with this service. 
              These albums will appear when users view this service on the website.
            </p>
          </div>

          {availableAlbums.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No portfolio albums available. Create albums in the Portfolio section first.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableAlbums.map((album) => {
                const isSelected = formData.linkedAlbumIds.includes(album._id);
                return (
                  <button
                    key={album._id}
                    type="button"
                    onClick={() => toggleAlbum(album._id)}
                    className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-video mb-2 rounded bg-gray-100 overflow-hidden">
                      {album.coverImageUrl ? (
                        <img
                          src={album.coverImageUrl}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                      {album.title}
                    </p>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {initialData ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
