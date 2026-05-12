import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mindset",
    template: "%s | Mindset",
  },

  description:
    "Mindset helps kids and teens learn Coding, AI, Web Development, Python, Mathematics, and Science through interactive and beginner-friendly courses.",

  keywords: [
    "Mindset",
    "Coding for kids",
    "Python classes",
    "AI classes for kids",
    "Web development course",
    "Scratch programming",
    "Thunkable app development",
    "Science classes",
    "Math classes",
    "Coding classes India",
    "STEM education",
    "Programming for students",
  ],

  authors: [{ name: "Mindset" }],

  creator: "Mindset",

  publisher: "Mindset",

  metadataBase: new URL("https://mindset-flame.vercel.app/"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Mindset",

    description:
      "Interactive coding and academic learning platform for kids and teens.",

    url: "https://mindset-flame.vercel.app/",

    siteName: "Mindset",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindset",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Mindset",

    description:
      "Learn Coding, AI, Python, Maths & Science in a fun and interactive way.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
