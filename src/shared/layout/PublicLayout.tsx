import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
