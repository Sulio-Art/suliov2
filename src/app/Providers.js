"use client";

import { SessionProvider, useSession } from "next-auth/react";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { setCredentials, selectBackendToken } from "@/redux/auth/authSlice";

const AuthSync = ({ children }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const tokenInStore = useSelector(selectBackendToken);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.backendToken &&
      session.backendToken !== tokenInStore
    ) {
      console.log("[AuthSync] Session token detected. Syncing to Redux store.");
      dispatch(
        setCredentials({
          user: session.user,
          backendToken: session.backendToken,
        })
      );
    }
  }, [status, session, dispatch, tokenInStore]);

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