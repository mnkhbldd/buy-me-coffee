"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import jwt from "jsonwebtoken";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userId, setUserId] = useState<string>("");

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      return token;
    }
    return null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && typeof decoded === "object" && "id" in decoded) {
          setUserId((decoded as any).id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContext.Provider value={{ userId, setUserId }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
