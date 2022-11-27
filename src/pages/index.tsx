import React from "react";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps } from "next";

import { useAuth } from "../hooks/useAuth";

const Home: NextPage = () => {
  const { user, signInWithTwitter } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!user) {
      await signInWithTwitter();
    }
    router.push("/my-messages", undefined);
  };

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-gray-300 min-h-screen">
        <div className="w-full flex flex-col items-center px-4 pt-8 pb-16 sm:py-16">
          <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center gap-x-8">
            <div className="lg:text-left md:text-xl text-gray-500 dark:text-gray-300">
              <h1 className="text-2xl md:text-4xl dark:text-gray-300 text-gray-700 font-bold ">
                📮 Nota do desenvolvedor
              </h1>
              <p className="mt-3 sm:mt-6 max-w-2xl text-justify">
                O Correio Anônimo surgiu como um projeto de estudos de
                desenvolvimento de software e para uso apenas entre amigos. Em
                um ano, o projeto cresceu e foi usado por aproximadamente 14 mil
                pessoas.
              </p>
              <p className="mt-2 sm:mt-6 max-w-2xl text-justify">
                O intuito sempre foi de ser um projeto para gerar bem estar e
                conforto para seus amigos, dedicando palavras cuidadosas e
                alegres para deixar um dia cabisbaixo um pouco mais feliz. Mas o
                direito ao anônimato tem consequências.
              </p>
              <p className="mt-2 sm:mt-6 max-w-2xl text-justify">
                Cuidar de um projeto que lida com mensagens anônimas é uma faca
                de dois gumes, de um lado, você tem que garantir anônimato e
                pelo outro você precisa garantir que pessoas mal intencionadas
                abusem desse anonimato para causar mal a outras pessoas.
              </p>
              <p className="mt-2 sm:mt-6 max-w-2xl text-justify">
                Como desenvolvedor único do projeto, não tenho mais tempo para
                moderar e dar manutenção ao Correio, por isso, estarei
                desativando o site progressivamente.
              </p>
              <p className="mt-2 sm:mt-6 max-w-2xl text-justify">
                Para começar, o site não estará mais disponível para enviar
                novas mensagens. Se você já tem uma conta no Correio, você pode
                clicar no botão abaixo para poder ver suas mensagens, baixá-las
                ou apagar sua conta.
              </p>
              <p className="mt-2 sm:mt-6 max-w-2xl text-justify">
                Foi divertido enquanto durou, mas não tenho tempo para dar
                continuidade :) Além disso, estarei liberando o código fonte do
                site no GitHub.
              </p>
              <button
                className="mx-auto block mt-4 outline-none text-white bg-blue-500 px-5 py-3"
                onClick={handleSignIn}
              >
                Entrar com Twitter e baixar seus dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
