import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("../(admin)/login/login"), { ssr: false });

export default function LoginRoute() {
  return <LoginPage />;
}