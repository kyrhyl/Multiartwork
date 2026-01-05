import { SettingsContainer } from '@/features/settings/containers/SettingsContainer';

export const metadata = {
  title: 'Site Settings | Admin',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your website content, company information, and social media links.
        </p>
      </div>

      <SettingsContainer />
    </div>
  );
}
