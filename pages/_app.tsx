import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Navbar from "../components/Nav/Nav";
import { Provider } from "react-redux";
import { store } from "../Store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  let persistor = persistStore(store);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
