import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import NavBar from "@/components/NavBar";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const NavBarDynamic = dynamic(() => import("@/components/NavBar"), {
  suspense: true,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Tesla",
  description: "Electric Cars, Solar & Clean Energy | Tesla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarDynamic />
        {children}
      </body>
    </html>
  );
}
