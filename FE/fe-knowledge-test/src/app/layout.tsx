"use client";

import { useEffect, useState, ReactNode } from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import "./globals.css";

// Mendeklarasikan tipe props untuk DynamicProvider
interface DynamicProviderProps {
  children: ReactNode;
}

const DynamicProvider = ({ children }: DynamicProviderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Jangan render apa pun di sisi server
  }

  return <ReduxProvider>{children}</ReduxProvider>;
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DynamicProvider>{children}</DynamicProvider>
      </body>
    </html>
  );
}
