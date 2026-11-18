import type { Metadata } from 'next';
import { AuthGuardServer } from './auth-guard-server';

export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuardServer>{children}</AuthGuardServer>;
}
