import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-mauve-iota-25.vercel.app"),
  title: {
    default: "Tyrone Owen | Developer Portfolio",
    template: "%s | Tyrone Owen",
  },
  description:
    "Explore the developer portfolio of Tyrone Owen, featuring projects, skills, and work in progress.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://my-portfolio-mauve-iota-25.vercel.app/",
    siteName: "Tyrone Owen | Developer Portfolio",
    title: "Tyrone Owen | Developer Portfolio",
    description:
      "Explore the developer portfolio of Tyrone Owen, featuring projects, skills, and work in progress.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tyrone Owen's developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Owen | Developer Portfolio",
    description:
      "Explore the developer portfolio of Tyrone Owen, featuring projects, skills, and work in progress.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
