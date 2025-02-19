import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk, Outfit } from 'next/font/google';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeInfo } from "@/components/ThemeInfo";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Portfolio - Dynamic Themes",
  description: "A portfolio showcasing projects with dynamic themes based on time and weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${outfit.className} antialiased`}>
      <body className={`${geistSans.className} ${geistMono.className} ${spaceGrotesk.className} ${outfit.className}`}>
        <ThemeProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <ThemeInfo />
        </ThemeProvider>
      </body>
    </html>
  );
}
