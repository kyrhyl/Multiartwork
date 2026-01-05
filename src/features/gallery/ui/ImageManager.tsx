'use client';

import React, { useState } from 'react';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { InputField, TextAreaField } from '@/shared/ui/FormFields';

interface GalleryImage {
  _id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  order: number;
}

interface ImageManagerProps {
  albumId: string;
  images: GalleryImage[];
  onRefresh: () => void;
}

export function ImageManager({ albumId, images, onRefresh }: ImageManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', description: '' });
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = async () => {
    if (!newImageUrl) return;

    setIsAdding(true);
    try {
      const response = await fetch(`/api/admin/gallery/albums/${albumId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: newImageUrl,
          order: images.length,
        }),
      });

      if (!response.ok) throw new Error('Failed to add image');

      setNewImageUrl('');
      onRefresh();
    } catch (err) {
      alert('Failed to add image');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    setIsDeleting(imageId);
    try {
      const response = await fetch(`/api/admin/gallery/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');

      onRefresh();
    } catch (err) {
      alert('Failed to delete image');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleUpdateImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/gallery/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!response.ok) throw new Error('Failed to update image');

      setEditingImage(null);
      onRefresh();
    } catch (err) {
      alert('Failed to update image');
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Image */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Add New Image</h3>
        <div className="space-y-4">
          <ImageUpload
            label="Upload Image"
            currentImage={newImageUrl}
            onUpload={setNewImageUrl}
            disabled={isAdding}
          />
          <button
            onClick={handleAddImage}
            disabled={!newImageUrl || isAdding}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding...' : 'Add Image'}
          </button>
        </div>
      </div>

      {/* Images Grid */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Album Images ({images.length})</h3>
        {images.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No images in this album yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  {editingImage === image._id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        placeholder="Image title"
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        placeholder="Image description"
                        rows={2}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateImage(image._id)}
                          className="flex-1 px-3 py-1 bg-primary text-white rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingImage(null)}
                          className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {image.title && <p className="font-medium text-sm mb-1">{image.title}</p>}
                      {image.description && <p className="text-xs text-gray-500 mb-2">{image.description}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingImage(image._id);
                            setEditData({ title: image.title || '', description: image.description || '' });
                          }}
                          className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this image?')) {
                              handleDelete(image._id);
                            }
                          }}
                          disabled={isDeleting === image._id}
                          className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm disabled:opacity-50"
                        >
                          {isDeleting === image._id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
