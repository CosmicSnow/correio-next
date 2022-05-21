import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className="dark:bg-gray-900" {...pageProps} />;
}

export default MyApp;
