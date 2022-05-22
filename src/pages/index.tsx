import React, { useRef, useState, useCallback } from "react";

import type { NextPage } from "next";
import { FormHandles, SubmitHandler } from "@unform/core";
import { MessageDataInterface } from "types/MessageData";

import { Form } from "@unform/web";

import { Alert } from "components/Alert";
import { Input } from "components/Input";
import { Radio } from "components/Radio";
import { Textarea } from "components/Textarea";

import { colorOptions } from "utils/colors";

const Home: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const [bg, setBg] = useState("bg-blue-400");

  const handleSignIn = async () => {
    // if (!user) {
    // await signInWithTwitter();
    // }
    // navigate("/my-messages", { replace: true });
  };

  const onChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const colorOption = colorOptions.find(
        (color) => color.id === e.target.id
      );
      if (colorOption) setBg(colorOption.btnColor);
    },
    []
  );

  const handleFormSubmit = useCallback<SubmitHandler<MessageDataInterface>>(
    (data) => {
      if (!data.user) {
        alert("Preencha o campo nome corretamente!");
        return;
      }
      if (!data.message || data.message.length < 3) {
        alert("Escreva uma mensagem com no mínimo 3 caracteres!");
        return;
      }

      if (data.user.length > 50 || data.message.length > 800) {
        alert("Sua mensagem foi rejeitada!");
        return;
      }

      alert("Mensagem enviada com sucesso! ❤");
      return;
    },
    []
  );

  const handlePix = useCallback(async () => {
    await navigator.clipboard.writeText(`e8949c0d-7327-45cb-8359-efe3d73ae8ff`);
    alert("Chave PIX copiada! Por favor, considere apoiar o projeto!");
  }, []);

  return (
    <div className="dark:bg-gray-900 dark:text-gray-300">
      <div className="w-full flex flex-col items-center px-4 pt-8 pb-16 sm:py-16">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-around gap-x-8">
          <div className="text-center lg:text-left md:text-xl text-gray-500 dark:text-gray-300">
            <h1 className="text-2xl md:text-4xl dark:text-gray-300 text-gray-700 font-bold ">
              📮 correio anônimo
            </h1>
            <p className="mt-3 sm:mt-6 max-w-2xl">
              envie e receba recados escritos anônimamente por pessoas ao redor
              do mundo usando apenas seu twitter.
            </p>
            <p className="mt-3 sm:mt-6 max-w-2xl">
              já ajudamos mais de 9 mil pessoas a enviar cartas de carinho!
            </p>

            <Alert className="mt-4">🎉 Obrigado pelos 9 mil usuários!</Alert>
          </div>

          <div className="mt-8 lg:mt-0">
            <Form
              className="flex flex-col mt-4"
              ref={formRef}
              onSubmit={handleFormSubmit}
            >
              <div className="flex">
                <label
                  htmlFor="user"
                  className="
                  flex-shrink
                  font-bold
                  dark:text-gray-300 text-gray-700 text-2xl
                  inline-block
                "
                >
                  Enviar para @
                </label>
                <Input
                  name="user"
                  type="text"
                  placeholder="alguemespecial"
                  className="w-6/12 sm:w-7/12 appearance-none outline-none text-2xl dark:bg-gray-900"
                />
              </div>
              <Textarea
                autoFocus
                name="message"
                placeholder="Deixe seu recado anônimo!"
                className="
                inline-block
                resize-none
                appearance-none
                outline-none
                mt-4
                bg-gray-100
                dark:bg-gray-700
                px-4
                py-3
                h-36
              "
              ></Textarea>

              <div className="mt-2">Mande mensagens com cores diferentes!</div>
              <Radio
                name="color"
                options={colorOptions}
                inputClassName={`mr-2`}
                labelClassName={`mr-2`}
                onChange={onChangeRadio}
              />

              <button
                className={`
                ${bg}
                font-semibold
                text-xl
                py-4
                text-white
                rounded-sm
                transition-colors
                hover:brightness-110
                mt-4
              `}
              >
                enviar! 📨
              </button>

              <button
                className="block mt-4 outline-none dark:text-gray-300 text-gray-700 underline"
                onClick={handleSignIn}
              >
                clique aqui para checar suas mensagens com o twitter!
              </button>
            </Form>
          </div>
        </div>

        <div className="mt-32 bg-gray-900">
          <h2 className="text-3xl md:text-5xl dark:text-gray-300 text-gray-700 font-bold text-center">
            como funciona?
          </h2>
          <p className="mt-3 sm:mt-6 max-w-3xl leading-loose dark:text-gray-300 text-gray-500">
            quando você envia um recado a algum usuário, ele fica guardado
            apenas para quem irá receber, sem registrar nenhum dado de quem
            enviou. já para checar os bilhetes que recebeu, você precisará
            entrar com sua conta do twitter, para evitar que ninguém espie seus
            recados. (Em caso de mensagens de cunho malicioso, os
            administradores podem ler as suas mensagens para filtrar conteúdos
            desconfortáveis)
          </p>

          <ul
            className="
              flex
              -space-x-8
              mt-20
              w-full
              items-center
              justify-center
              dark:text-black
            "
          >
            <li
              className="
                w-28
                h-28
                sm:w-48 sm:h-48
                bg-purple-200
                transform
                -rotate-6
                hover:-rotate-3 hover:scale-105
                transition
                py-2
                px-4
                shadow
                text-xs
                md:text-base
              "
            >
              te amo muito, namora comigo?
            </li>
            <li
              className="
                w-28
                h-28
                sm:w-48 sm:h-48
                bg-pink-200
                transform
                rotate-6
                -translate-y-10
                hover:-translate-y-12 hover:scale-105
                transition
                py-2
                px-4
                shadow
                text-xs
                md:text-base
              "
            >
              você me deve um lanche.
            </li>
            <li
              className="
                w-28
                h-28
                sm:w-48 sm:h-48
                bg-green-200
                transform
                -rotate-6
                hover:-rotate-3 hover:scale-105
                transition
                py-2
                px-4
                shadow
                text-xs
                md:text-base
              "
            >
              desculpa por brigar com você naquela festa
            </li>
          </ul>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl md:text-5xl dark:text-gray-300 text-gray-700 font-bold text-center">
            experiência segura
          </h2>
          <p className="mt-3 sm:mt-6 max-w-3xl leading-loose dark:text-gray-300 text-gray-500">
            Conheça o <span className="font-bold">Safe Filter</span>: Nosso
            mecanismo para evitar que cartas de cunho malicioso sejam enviadas.
            Essa é a nossa ferramenta para que possamos garantir todo dia mais
            que sua experiência seja segura e confortável.
          </p>

          <ul
            className="
              flex
              space-x-8
              mt-8
              w-full
              items-center
              justify-center
            "
          >
            <li>
              <div
                className={`py-1 px-2 sm:py-2 sm:px-4 bg-green-400 text-white font-medium flex items-center`}
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="ml-2 hidden sm:inline">desativar filtro</span>
              </div>
            </li>
            <li>
              <div
                className={`py-1 px-2 sm:py-2 sm:px-4 bg-red-400
                 text-white font-medium flex items-center`}
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
                    d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                  />
                </svg>

                <span className="ml-2 hidden sm:inline">ativar filtro</span>
              </div>
            </li>
          </ul>
        </div>
        <span className="text-gray-400 mt-20">
          feito por
          <a href="https://twitter.com/krteazy" className="ml-1 underline">
            @krteazy
          </a>
          . quer me ajudar a manter o projeto?
          <span onClick={handlePix} className="ml-1 underline">
            faça uma doação
          </span>
        </span>
      </div>
    </div>
  );
};

export default Home;
