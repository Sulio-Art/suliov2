"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loader2 } from "lucide-react";
import UnsavedChangesDialog from "./Components/Reuseable/useUnsavedChanges.js";

const ReduxLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
);

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<ReduxLoading />} persistor={persistor}>
          {children}
           <UnsavedChangesDialog/>
        </PersistGate>
      </ReduxProvider>
    </SessionProvider>
  );
}