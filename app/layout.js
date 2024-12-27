"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import store from "../lib/store";
import AppBar from "./components/AppBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AppBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
