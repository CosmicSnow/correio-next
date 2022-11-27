/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Link from "next/link";
import { useRouter } from "next/router";

import { SEO } from "components/SEO";

import { MessageDataInterface } from "types/MessageData";

import { useAuth } from "hooks/useAuth";

import api from "services/api";

const MyMessages: NextPage = () => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<MessageDataInterface[]>([]);
  const [loading, setLoading] = useState(true);
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

  function downloadMessagesAsJson() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(messages)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "messages.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  function handleDeleteAccount() {
    const permission = confirm(
      "Você tem certeza que deseja apagar sua conta? Essa ação não pode ser desfeita."
    );

    if (user?.accessToken) {
      if (permission) {
        api
          .delete(`users/${user?.username}`, {
            params: {
              auth: `${user.accessToken}`,
            },
          })
          .then((message) => {
            alert(message.data.success);
            handleSignOut();
          })
          .catch(() => {
            alert("Não foi possível apagar sua conta.");
          });
        return;
      }
    }
  }

  return (
    <>
      <SEO />
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
          <div className="flex gap-x-2">
            <button
              className="py-1 px-2 sm:py-2 sm:px-4 bg-green-500 text-white font-medium flex items-center"
              onClick={downloadMessagesAsJson}
            >
              <span>Baixar mensagens</span>
            </button>
            <button
              className="py-1 px-2 sm:py-2 sm:px-4 bg-red-500 text-white font-medium flex items-center"
              onClick={handleDeleteAccount}
            >
              <span>Desativar conta</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMessages;
