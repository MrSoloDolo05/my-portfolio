import { AuthGuardServer } from './auth-guard-server';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuardServer>{children}</AuthGuardServer>;
}
