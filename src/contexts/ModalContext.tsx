import React, { createContext, useState } from "react";

interface ModalContextProps {
  isVisible: boolean;
  contentIndex: number;
  toggle: () => void;
  setIndex: (index: number) => void;
}

type ModalContextProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext({} as ModalContextProps);

const ModalContextProvider = (props: ModalContextProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);

  const toggle = () => {
    setIsVisible((state) => !state);
  };

  const setIndex = (index: number) => {
    setContentIndex(index);
  };

  return (
    <ModalContext.Provider
      value={{ isVisible, toggle, contentIndex, setIndex }}
    >
      <div className={isVisible ? "h-screen overflow-hidden" : ""}>
        {props.children}
      </div>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
