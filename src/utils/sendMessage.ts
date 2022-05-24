import { AxiosError } from "axios";
import api from "services/api";

import { MessageDataInterface } from "types/MessageData";

export const sendMessage = async (data: MessageDataInterface) => {
  try {
    if (!data.user || data.user.length < 4) {
      throw new Error("Preencha o campo nome corretamente!");
    }
    if (!data.content || data.content.length < 3) {
      throw new Error("Escreva uma mensagem com no mínimo 3 caracteres!");
    }

    if (data.user.length > 50 || data.content.length > 800) {
      throw new Error("Sua mensagem foi rejeitada!");
    }

    const request = await api.post("sendMessage", {
      user: data.user,
      content: data.content,
      color: data.color,
    });

    if (request.status == 200) alert("Mensagem enviada com sucesso! ❤");
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(
        "Erro ao enviar mensagem! Verifique se o nome do usuário está escrito corretamente."
      );
    } else {
      alert(e);
    }
  }
};
