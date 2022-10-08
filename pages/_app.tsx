import React from "react";
import Router from "next/router";
import Navbar from "../components/Nav/Nav";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "../styles/nprogress.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// Route loading progress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  let persistor = persistStore(store);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
