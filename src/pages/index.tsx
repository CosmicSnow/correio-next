/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import type { NextPage, GetStaticProps } from "next";
import { FormHandles } from "@unform/core";
import { MessageDataInterface } from "types/MessageData";

import { Form } from "@unform/web";

import { useAuth } from "../hooks/useAuth";

import { SEO } from "components/SEO";
import { Alert } from "components/Alert";
import { Input } from "components/Input";
import { Radio } from "components/Radio";
import { Textarea } from "components/Textarea";

import { colorOptions } from "utils/colors";

import { sendMessage } from "utils/sendMessage";

const Home: NextPage = () => {
  const { user, signInWithTwitter } = useAuth();
  const [bg, setBg] = useState("bg-blue-400");
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (formRef && router.query.username)
      formRef.current?.setFieldValue("user", router.query.username);
    window.history.pushState({}, "", "/");
  }, [router.query.username]);

  const handleSignIn = async () => {
    if (!user) {
      await signInWithTwitter();
    }
    router.push("/my-messages", undefined);
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

  const handleFormSubmit = async (data: MessageDataInterface) => {
    setLoading(true);

    await sendMessage({
      ...data,
      color: colorOptions.find((color) => color.btnColor === bg)
        ?.value as string,
    });

    formRef.current?.clearField("content");

    setLoading(false);
  };

  const handlePix = useCallback(async () => {
    await navigator.clipboard.writeText(`e8949c0d-7327-45cb-8359-efe3d73ae8ff`);
    alert("Chave PIX copiada! Por favor, considere apoiar o projeto!");
  }, []);

  return (
    <>
      <SEO />
      <div className="dark:bg-gray-900 dark:text-gray-300">
        <div className="w-full flex flex-col items-center px-4 pt-8 pb-16 sm:py-16">
          <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-around gap-x-8">
            <div className="text-center lg:text-left md:text-xl text-gray-500 dark:text-gray-300">
              <h1 className="text-2xl md:text-4xl dark:text-gray-300 text-gray-700 font-bold ">
                📮 correio anônimo
              </h1>
              <p className="mt-3 sm:mt-6 max-w-2xl">
                envie e receba recados escritos anônimamente por pessoas ao
                redor do mundo usando apenas seu twitter.
              </p>
              <p className="mt-3 sm:mt-6 max-w-2xl">
                já ajudamos mais de 9 mil pessoas a enviar cartas de carinho!
              </p>

              <Alert className="mt-4" full={false}>
                <a
                  target="_blank"
                  className="font-semibold underline pointer"
                  href="https://twitter.com/o_correio_anon"
                  rel="noreferrer"
                >
                  Siga nosso perfil no Twitter! @o_correio_anon
                </a>
              </Alert>
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
                  name="content"
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

                <div className="mt-2">
                  Mande mensagens com cores diferentes!
                </div>
                <Radio
                  name="color"
                  options={colorOptions}
                  inputClassName={`mr-2`}
                  labelClassName={`mr-2`}
                  onChange={onChangeRadio}
                />

                <button
                  type="submit"
                  disabled={loading}
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
              </Form>
              <button
                className="mx-auto block mt-4 outline-none dark:text-gray-300 text-gray-700 underline"
                onClick={handleSignIn}
              >
                clique aqui para checar suas mensagens com o twitter!
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
