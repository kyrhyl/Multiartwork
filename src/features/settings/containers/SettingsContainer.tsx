'use client';

import React, { useState, useEffect } from 'react';
import { InputField, TextAreaField } from '@/shared/ui/FormFields';
import { ImageUpload } from '@/shared/ui/ImageUpload';
import { ServicesEditor } from '../ui/ServicesEditor';
import { SocialLinksEditor } from '../ui/SocialLinksEditor';

interface Service {
  title: string;
  description: string;
  icon?: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface SettingsFormData {
  companyName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  services: Service[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: SocialLinks;
}

export function SettingsContainer() {
  const [formData, setFormData] = useState<SettingsFormData>({
    companyName: '',
    tagline: '',
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    aboutText: '',
    services: [],
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    socialLinks: {},
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success && data.settings) {
        setFormData({
          companyName: data.settings.companyName || '',
          tagline: data.settings.tagline || '',
          heroTitle: data.settings.heroTitle || '',
          heroSubtitle: data.settings.heroSubtitle || '',
          heroImage: data.settings.heroImage || '',
          aboutText: data.settings.aboutText || '',
          services: data.settings.services || [],
          contactEmail: data.settings.contactEmail || '',
          contactPhone: data.settings.contactPhone || '',
          contactAddress: data.settings.contactAddress || '',
          socialLinks: data.settings.socialLinks || {},
        });
      }
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicesChange = (services: Service[]) => {
    setFormData((prev) => ({ ...prev, services }));
  };

  const handleSocialLinksChange = (socialLinks: SocialLinks) => {
    setFormData((prev) => ({ ...prev, socialLinks }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to save settings');
      }

      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      {/* General Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">General Information</h2>
        
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          required
          disabled={isSaving}
        />

        <InputField
          label="Tagline"
          name="tagline"
          value={formData.tagline}
          onChange={handleInputChange}
          disabled={isSaving}
        />
      </section>

      {/* Hero Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hero Section</h2>
        
        <InputField
          label="Hero Title"
          name="heroTitle"
          value={formData.heroTitle}
          onChange={handleInputChange}
          disabled={isSaving}
        />

        <InputField
          label="Hero Subtitle"
          name="heroSubtitle"
          value={formData.heroSubtitle}
          onChange={handleInputChange}
          disabled={isSaving}
        />

        <ImageUpload
          label="Hero Background Image"
          currentImage={formData.heroImage}
          onUpload={(url: string) => setFormData((prev) => ({ ...prev, heroImage: url }))}
          disabled={isSaving}
        />
      </section>

      {/* About Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Section</h2>
        
        <TextAreaField
          label="About Text"
          name="aboutText"
          value={formData.aboutText}
          onChange={handleInputChange}
          rows={6}
          disabled={isSaving}
        />
      </section>

      {/* Services */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
        <ServicesEditor
          services={formData.services}
          onChange={handleServicesChange}
          disabled={isSaving}
        />
      </section>

      {/* Contact Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        
        <InputField
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          disabled={isSaving}
        />

        <InputField
          label="Contact Phone"
          name="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={handleInputChange}
          disabled={isSaving}
        />

        <TextAreaField
          label="Contact Address"
          name="contactAddress"
          value={formData.contactAddress}
          onChange={handleInputChange}
          rows={3}
          disabled={isSaving}
        />
      </section>

      {/* Social Links */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
        <SocialLinksEditor
          socialLinks={formData.socialLinks}
          onChange={handleSocialLinksChange}
          disabled={isSaving}
        />
      </section>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
