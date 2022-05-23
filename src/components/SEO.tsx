import React from "react";
import Head from "next/head";

const SEO: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#60a5fa" />
      <meta
        name="description"
        content="Envie mensagens para pessoas queridas de forma anônima"
      />

      <meta name="twitter:card" content="summary" />
      <meta
        property="og:title"
        content="Correio anônimo: envie mensagens para todos"
      />
      <meta
        property="og:description"
        content="Envie mensagens para pessoas queridas de forma anônima"
      />

      <meta
        property="og:image"
        content="https://correioanonimo.com.br/bg.png"
      />

      <title>correio anônimo</title>
    </Head>
  );
};

export { SEO };
