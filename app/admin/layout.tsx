'use client';

import { AdminLayout } from '@/shared/layout/AdminLayout';
import { usePathname } from 'next/navigation';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't apply admin layout to login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
}
