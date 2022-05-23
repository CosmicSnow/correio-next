import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { findTwitterIdByUsername } from "utils/twitter";
import forbiddenUsernames from "utils/forbiddenUsernames";
import { MessageDataInterface } from "types/MessageData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const username = req.query?.username as string;
    const authorization = req.query?.auth as string;

    const conditionals = [
      authorization,
      username,
      username.length >= 4,
      !forbiddenUsernames.includes(username),
      username.length < 50,
    ];

    if (authorization && conditionals.every(Boolean)) {
      const twitterId = await findTwitterIdByUsername(username);

      if (twitterId) {
        const { data, status } = await axios.get(
          `${process.env?.DATABASE_URL}/messages/${twitterId}.json`,
          {
            params: {
              auth: authorization,
            },
          }
        );

        if (status == 200) {
          const messages = Object.entries(data).map((message) => {
            const key = message[0];
            const data = message[1] as MessageDataInterface;
            return {
              id: key,
              ...data,
            };
          });
          return res.status(200).json(messages);
        }

        return res.status(status).json(false);
      }
    }

    console.error(conditionals);
    return res.status(400).json(false);
  } catch (e) {
    console.error(e);
    return res.status(500).json(false);
  }
}
