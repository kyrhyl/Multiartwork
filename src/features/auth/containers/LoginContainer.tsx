"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoginForm } from '@/features/auth/ui/LoginForm';

export function LoginContainer() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    loading: boolean;
  }>({ connected: false, loading: true });

  useEffect(() => {
    // Check database connection status on mount
    const checkDbStatus = async () => {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        setDbStatus({ connected: data.connected, loading: false });
      } catch {
        setDbStatus({ connected: false, loading: false });
      }
    };
    
    checkDbStatus();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Login failed');
      }

      // Token is set as httpOnly cookie by the server
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} dbStatus={dbStatus} />;
}
