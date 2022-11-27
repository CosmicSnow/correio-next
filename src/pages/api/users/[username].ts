import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { findTwitterIdByUsername } from "utils/twitter";
import forbiddenUsernames from "utils/forbiddenUsernames";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "DELETE") return res.status(400).json(false);

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
        const { status } = await axios.delete(
          `${process.env?.DATABASE_URL}/messages/${twitterId}.json`,
          {
            params: {
              auth: authorization,
            },
          }
        );

        if (status == 200) {
          return res.status(200).json({ success: true });
        }

        return res.status(status).json(false);
      }
    }

    return res.status(400).json(false);
  } catch (e) {
    console.error(e);
    return res.status(500).json(false);
  }
}
