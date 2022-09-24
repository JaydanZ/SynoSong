import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Nav/Nav";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
