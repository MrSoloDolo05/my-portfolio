import type { Metadata } from "next";

const siteUrl = "https://my-portfolio-mauve-iota-25.vercel.app";
const siteName = "Tyrone Owen | Developer Portfolio";
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Tyrone Owen's developer portfolio",
};

export function createPageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const fullTitle = `${title} | Tyrone Owen`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: new URL(path, siteUrl),
      siteName,
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage.url],
    },
  };
}
