import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AuthContextProvider } from "../contexts/AuthContext";
import { ModalContextProvider } from "../contexts/ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ModalContextProvider>
  );
}

export default MyApp;
