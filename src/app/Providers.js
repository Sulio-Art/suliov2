"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store"; 
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        {children}
        <Toaster position="bottom-right" />
      </ReduxProvider>
    </SessionProvider>
  );
}
