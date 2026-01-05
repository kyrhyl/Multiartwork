import React from 'react';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface SocialLinksEditorProps {
  socialLinks: SocialLinks;
  onChange: (socialLinks: SocialLinks) => void;
  disabled?: boolean;
}

export function SocialLinksEditor({ socialLinks, onChange, disabled = false }: SocialLinksEditorProps) {
  const handleChange = (platform: keyof SocialLinks, value: string) => {
    onChange({ ...socialLinks, [platform]: value });
  };

  const platforms = [
    { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
    { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/yourpage' },
    { key: 'twitter' as const, label: 'Twitter', placeholder: 'https://twitter.com/yourpage' },
    { key: 'linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourpage' },
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
      
      {platforms.map(({ key, label, placeholder }) => (
        <div key={key} className="space-y-1">
          <label htmlFor={key} className="block text-sm text-gray-600">
            {label}
          </label>
          <input
            type="url"
            id={key}
            value={socialLinks[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      ))}
    </div>
  );
}
