import React from "react";
import { MessageDataInterface } from "types/MessageData";

import { useAuth } from "hooks/useAuth";
import { useModal } from "hooks/useModal";

import { intent } from "../utils/intent";

interface ModalProps {
  list: MessageDataInterface[];
}

const Modal: React.FC<ModalProps> = ({ list }) => {
  const { user } = useAuth();
  const { isVisible, toggle, contentIndex } = useModal();

  const content = list[contentIndex];

  return (
    <>
      {isVisible && (
        <div
          className="h-screen bg-black text-white bg-opacity-50 w-full absolute z-50 flex items-center justify-center flex-col"
          onClick={toggle}
        >
          <div
            className="flex items-center flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggle}
              className="cursor-pointer font-bold text-xl"
            >
              &larr; Fechar
            </button>

            <div
              className={`
                w-64 md:w-96
                transform
                transition
                py-2
                px-4
                shadow
                text-3xs
                md:text-base
                pb-12
                text-black
                mt-8
                min-h-[240px]
                ${content.color || "bg-blue-200"}
            `}
            >
              {content.content}
            </div>

            <div className="flex items-center w-full gap-x-4">
              <button
                className="w-full mt-4 bg-red-500 text-white font-bold px-4 py-4 flex items-center justify-center"
                onClick={() =>
                  alert("A função está desativada para manutenção!")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Apagar
              </button>
              <a
                className="w-full mt-4 bg-white text-black font-bold px-4 py-4 flex items-center justify-center"
                href={`https://twitter.com/intent/tweet?text=${intent(
                  content.content,
                  user?.username as string
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Tuitar sobre
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
