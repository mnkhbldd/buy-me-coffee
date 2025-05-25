"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import jwt from "jsonwebtoken";
import { axiosInstance } from "@/lib/utils";

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
  const [profile, setProfile] = useState<any>(null);
  const [bankCard, setBankCard] = useState<any>(null);

  const handleLogOut = () => {
    setProfile("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/current-user`,
          { withCredentials: true }
        );
        // console.log("User profile:", response.data);
        setProfile(response.data.profile);
      } catch (error) {
        // console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();

    const fetchBankCard = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/bankcard/current-bankcard`,
          { withCredentials: true }
        );
        // console.log("aa :", response.data);
        setBankCard(response.data.bankCard);
      } catch (error) {
        // console.error("Failed to fetch user profile:", error);
      }
    };

    fetchBankCard();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContext.Provider value={{ profile, handleLogOut, bankCard }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
