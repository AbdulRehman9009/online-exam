import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    default: "Online Exam System",
    template: "%s | Online Exam System",
  },
  description: "A comprehensive Online Examination System for seamless student assessment, faculty management, and automated evaluation.",
  keywords: ["online exam", "examination system", "student assessment", "e-learning", "education portal", "faculty dashboard", "quiz platform", "university portal"],
  authors: [{ name: "Admin" }],
  creator: "System Administrator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: "Online Exam System",
    description: "A comprehensive Online Examination System for seamless student assessment and evaluation.",
    siteName: "Online Exam System",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
