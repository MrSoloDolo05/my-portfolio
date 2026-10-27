import { AuthGuardServer } from './auth-guard-server';

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuardServer>{children}</AuthGuardServer>;
}
