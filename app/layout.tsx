import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-day-picker/dist/style.css";
import AppProviders from "@/components/providers/AppProviders";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const orbitron = localFont({
  src: [
    {
      path: "../public/fonts/Orbitron/static/Orbitron-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Orbitron/static/Orbitron-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Orbitron/static/Orbitron-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Orbitron/static/Orbitron-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CogniVision | Spatial AI & AR SDK",
  description:
    "Cognivision brings computer vision and AR intelligence to hybrid apps with one unified SDK.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${poppins.variable} ${orbitron.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
