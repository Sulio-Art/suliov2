import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";
import SubscriptionGate from "./Components/Reuseable/SubscriptionGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Artist Platform",
  description: "Manage and showcase your artwork",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SubscriptionGate>
            {children}
            <Toaster position="top-center" />
          </SubscriptionGate>
        </Providers>
      </body>
    </html>
  );
}

// TODO  add the same Subscription.create(...) logic to your completeInstagramRegistration function to cover all sign-up paths.