/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Link from "next/link";
import { useRouter } from "next/router";

import { MessageDataInterface } from "types/MessageData";

import { SEO } from "components/SEO";
import { Modal } from "components/Modal";
import { Alert } from "components/Alert";
import { Message } from "components/Message";

import { useAuth } from "hooks/useAuth";

import api from "services/api";

const MyMessages: NextPage = () => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<MessageDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [safeFilter, setSafeFilter] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    async function loadMessages() {
      console.info("Fetching messages...");

      if (user?.accessToken) {
        const { data, status } = await api.get(`messages/${user?.username}`, {
          params: {
            auth: `${user.accessToken}`,
          },
        });

        if (status == 200) setMessages(data.reverse());
      }
      setLoading(false);
    }

    loadMessages();

    window.addEventListener("focus", loadMessages);

    return () => {
      window.removeEventListener("focus", loadMessages);
    };
  }, [user]);

  async function handleSignOut() {
    await signOut();

    router.push("/");
  }

  function handleFilters() {
    if (
      safeFilter &&
      window.confirm(
        "Deseja mesmo desativar os filtros? Ao desativar, mensagens com conteúdo de ódio ou desconfortável serão exibidas."
      )
    ) {
      setSafeFilter(false);
    } else {
      setSafeFilter(true);
    }
  }

  async function handleShare() {
    await navigator.clipboard.writeText(
      `Me envie uma mensagem no correio anônimo! https://correioanonimo.com.br/${user?.username}`
    );
    alert(
      "Seu link foi copiado para a área de transferência! Copie e cole para seus amigos!"
    );
  }

  return (
    <>
      <SEO />
      {messages && <Modal list={messages} />}
      <div className="min-h-screen dark:bg-gray-900 pb-32 overflow-y-hidden">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="w-full flex items-center justify-between h-20">
            <Link href="/" passHref>
              <a className="text-xl sm:text-3xl dark:text-gray-300 text-gray-700 font-bold">
                📮 correio anônimo
              </a>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                className={`py-1 px-2 sm:py-2 sm:px-4 ${
                  safeFilter ? "bg-green-400" : "bg-red-400"
                } text-white font-medium flex items-center`}
                onClick={handleFilters}
              >
                {safeFilter ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                    />
                  </svg>
                )}

                <span className="ml-2 hidden sm:inline">
                  {safeFilter ? "desativar filtro" : "ativar filtro"}
                </span>
              </button>

              <button
                className="py-1 px-2 sm:py-2 sm:px-4 bg-blue-400 text-white font-medium flex items-center"
                onClick={handleShare}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="ml-2 hidden sm:inline">compartilhar link</span>
              </button>

              <button
                className="py-1 px-2 sm:py-2 sm:px-4 bg-blue-400 text-white font-medium flex items-center"
                onClick={handleSignOut}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="ml-2 hidden sm:inline">sair da conta</span>
              </button>
            </div>
          </div>

          <div className="mt-4 sm:mt-8">
            {user && (
              <h1 className="text-2xl md:text-4xl text-gray-700 font-bold dark:text-gray-300">
                Cartinhas para {user?.username}
              </h1>
            )}

            <Alert className="mt-8" full>
              <span className="font-bold">Novidade! 🚀</span>{" "}
              <a
                target="_blank"
                className="font-semibold underline pointer"
                href="https://twitter.com/o_correio_anon"
                rel="noreferrer"
              >
                Siga nosso perfil no Twitter @o_correio_anon para ficar sabendo
                de atualizações!
              </a>{" "}
            </Alert>

            {!loading ? (
              messages.length > 0 ? (
                <div
                  id="message-container"
                  className="mt-8 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4"
                >
                  {messages.map((message, index) => (
                    <button
                      className="appearance-none text-left"
                      key={message.id}
                    >
                      <Message
                        index={index}
                        content={message.content}
                        bgColor={message.color}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-full h-72 flex items-center justify-center flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 dark:text-gray-300 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700 font-bold text-3xl">
                    Tudo parece vazio :(
                  </span>
                  <span className="mt-2 dark:text-gray-300 text-gray-700 text-xl px-8">
                    Você ainda não recebeu nenhuma mensagem.
                  </span>
                  <button
                    className="py-1 px-2 mt-4 sm:py-2 sm:px-4 bg-blue-400 text-white font-medium flex items-center"
                    onClick={handleShare}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    <span className="ml-2 hidden sm:inline">
                      compartilhar link
                    </span>
                  </button>
                </div>
              )
            ) : (
              <div className="w-full h-64 flex items-center justify-center flex-col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 dark:text-gray-300 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="dark:text-gray-300 text-gray-700 font-bold text-3xl">
                  Não se preocupe.
                </span>
                <span className="mt-2 dark:text-gray-300 text-gray-700 text-xl px-8">
                  Estamos carregando suas mensagens. Caso elas não apareçam,
                  tente sair da sua conta e entrar denovo.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMessages;
