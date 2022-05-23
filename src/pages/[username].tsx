import { GetServerSideProps } from "next";
import Head from "next/head";

const CustomUserLink: React.FC<{ username: string }> = ({ username }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#60a5fa" />
      <meta
        name="description"
        content={`Envie mensagens para ${username} de forma anônima!`}
      />

      <meta name="twitter:card" content="summary" />
      <meta
        property="og:title"
        content="Correio anônimo: envie mensagens para todos"
      />
      <meta
        property="og:description"
        content={`Envie mensagens para ${username} de forma anônima!`}
      />

      <meta
        property="og:image"
        content={`https://unavatar.io/twitter/${username}`}
      />

      <title>correio anônimo</title>
    </Head>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  return {
    props: {
      username: query.username,
    },
    redirect: {
      permanent: false,
      destination: `/?username=${query.username}`,
    },
  };
};
export default CustomUserLink;
