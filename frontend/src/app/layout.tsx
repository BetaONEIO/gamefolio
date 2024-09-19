import { lexendExa } from "@/font/font";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/components/ReduxProvider/reduxProvider";

export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamefolio",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gamefolio</title>
        {/* <meta name="description" content="Gamefolio" /> */}
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ReduxProvider>
        <body
          suppressHydrationWarning={true}
          className={`${lexendExa.className} overflow-hidden h-full `}
        >
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
