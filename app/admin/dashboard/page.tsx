import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Admin',
  description: 'Admin dashboard',
};

export default function DashboardPage() {
  const stats = [
    { label: 'Total Posts', value: '3', change: '+2 this month', icon: '📝' },
    { label: 'Gallery Albums', value: '3', change: 'All categories', icon: '🖼️' },
    { label: 'Total Images', value: '2', change: 'In gallery', icon: '📷' },
    { label: 'Published Posts', value: '2', change: '1 draft', icon: '✅' },
  ];

  const quickActions = [
    { label: 'Create Post', href: '/admin/posts/new', icon: '➕', color: 'bg-blue-500' },
    { label: 'Add Album', href: '/admin/gallery/albums/new', icon: '🖼️', color: 'bg-green-500' },
    { label: 'Site Settings', href: '/admin/settings', icon: '⚙️', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-blue-100">
          Manage your portfolio content, gallery, and blog posts from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1a2233] rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {stat.label}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 p-6 bg-white dark:bg-[#1a2233] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all"
            >
              <div className={`h-12 w-12 rounded-lg ${action.color} flex items-center justify-center text-2xl`}>
                {action.icon}
              </div>
              <span className="font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-medium mb-1">Database seeded successfully</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sample content including posts, albums, and images are ready.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl">🎨</span>
            <div>
              <h4 className="font-medium mb-1">Customize your site</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Go to <Link href="/admin/settings" className="text-primary hover:underline">Site Settings</Link> to update hero content and contact info.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-2xl">📝</span>
            <div>
              <h4 className="font-medium mb-1">Manage content</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Edit <Link href="/admin/posts" className="text-primary hover:underline">Posts</Link> and <Link href="/admin/gallery" className="text-primary hover:underline">Gallery</Link> from the sidebar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
