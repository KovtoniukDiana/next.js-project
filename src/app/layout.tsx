import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Header from "@/components/UI/header";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import { AppLoader } from "@/hoc/app-loader";
import Title from "@/components/UI/title";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Providers>
          <SessionProvider session={session} >
            <AppLoader>
              
              <Header /> 
              <Title />
              <main className={`flex flex-col max-w-[1024px] mx-auto justify-start w-full `}  style={{height: `calc(100vh - ${layoutConfig.headerhight} - ${layoutConfig.footerHeight})`}}>
                {children}
              </main>

              <footer className={`flex justify-center items-center bg-gray-100 dark:bg-gray-800 w-full`}  style={{height: layoutConfig.footerHeight}}>
                {siteConfig.description}
              </footer>

            </AppLoader>
          </SessionProvider>
        </Providers>
        
      </body>
    </html>
  );
}
