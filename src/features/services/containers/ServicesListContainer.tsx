'use client';

import React, { useState, useEffect } from 'react';
import { ServicesTable } from '../ui/ServicesTable';
import { ServiceForm } from '../ui/ServiceForm';

interface LinkedAlbum {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
}

interface Service {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  albumCount: number;
  linkedAlbums: LinkedAlbum[];
}

interface ServiceFormData {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  linkedAlbumIds: string[];
}

export function ServicesListContainer() {
  const [services, setServices] = useState<Service[]>([]);
  const [availableAlbums, setAvailableAlbums] = useState<{ _id: string; title: string; coverImageUrl?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
    fetchAlbums();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/services');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch services');
      }

      setServices(data.services || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/admin/gallery/albums');
      const data = await response.json();

      if (data.success) {
        setAvailableAlbums(data.albums.map((album: any) => ({
          _id: album._id,
          title: album.title,
          coverImageUrl: album.coverImage,
        })));
      }
    } catch (err) {
      console.error('Failed to fetch albums:', err);
    }
  };

  const handleDelete = async (title: string) => {
    try {
      setIsDeleting(title);
      const response = await fetch(`/api/admin/services/${encodeURIComponent(title)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to delete service');
      }

      setServices((prev) => prev.filter((s) => s.title !== title));
      setSuccessMessage('Service deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete service');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleCreate = async (formData: ServiceFormData) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create service');
      }

      setServices((prev) => [...prev, data.service]);
      setShowForm(false);
      setSuccessMessage('Service created successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create service');
    }
  };

  const handleUpdate = async (originalTitle: string, formData: ServiceFormData) => {
    try {
      const response = await fetch(`/api/admin/services/${encodeURIComponent(originalTitle)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update service');
      }

      setServices((prev) =>
        prev.map((s) => (s.title === originalTitle ? data.service : s))
      );
      setEditingService(null);
      setSuccessMessage('Service updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update service');
    }
  };

  if (showForm || editingService) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {editingService ? 'Edit Service' : 'Create New Service'}
          </h1>
          <button
            onClick={() => {
              setShowForm(false);
              setEditingService(null);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        <ServiceForm
          initialData={editingService || undefined}
          availableAlbums={availableAlbums}
          onSubmit={editingService 
            ? (data) => handleUpdate(editingService.title, data)
            : handleCreate
          }
          onCancel={() => {
            setShowForm(false);
            setEditingService(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">
            Manage your services and view linked portfolio albums
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + New Service
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ServicesTable
          services={services}
          onDelete={handleDelete}
          onEdit={setEditingService}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
