// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { colorEnum } from "utils/colors";
import forbiddenUsernames from "utils/forbiddenUsernames";

import { findTwitterIdByUsername } from "utils/twitter";
import { filter } from "utils/filter";

interface FirebaseResponse {
  name: string;
}

interface RequestProps {
  user: string;
  message: string;
  color: colorEnum;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  try {
    const { user, message, color } = req.body as RequestProps;

    const conditionals = [
      colorEnum[color] != undefined,
      user,
      user.length >= 4,
      !forbiddenUsernames.includes(user),
      message.length > 3,
      user.length < 50,
      message.length < 800,
    ];

    const twitterId = await findTwitterIdByUsername(user);

    if (conditionals.every(Boolean) && twitterId) {
      const date = new Date().toISOString();

      const filteredMessage = filter(message);

      const { data } = await axios.post<FirebaseResponse>(
        `${process.env?.DATABASE_URL}/messages/${twitterId}.json`,
        {
          date,
          content: filteredMessage,
          color,
        }
      );

      if (data) {
        return res.status(200).json(true);
      }
    }
    return res.status(400).json(false);
  } catch (e) {
    console.error(e);
    return res.status(500).json(false);
  }
}
