"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/Artwork/artworkSlice";

const AuthSync = ({ children }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session) {
      dispatch(setCredentials(session));
    }
  }, [status, session, dispatch]);

  return <>{children}</>;
};

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <AuthSync>{children}</AuthSync>
      </ReduxProvider>
    </SessionProvider>
  );
}