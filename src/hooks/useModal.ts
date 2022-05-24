import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const useModal = () => {
  const value = useContext(ModalContext);

  return value;
};
