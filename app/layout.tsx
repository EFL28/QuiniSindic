import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuiniSindic",
  description: "Predice los resultados y gana a tus amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-spartan">
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
