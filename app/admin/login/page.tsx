
import type { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the portfolio administration area.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginRoute() {
  return <Login />;
}
