import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata() {
  return {
    title: "AI Artist Platform",
    description: "Manage and showcase your artwork",
    other: {
      ...Sentry.getTraceData(),
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
