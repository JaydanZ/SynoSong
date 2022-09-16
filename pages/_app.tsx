import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Nav/Nav";
import { Provider } from "react-redux";
import { store } from "../Store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
