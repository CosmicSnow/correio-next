import twitter from "twitter";

const twitterClient = new twitter({
  consumer_key: process.env.CONSUMER_KEY as string,
  consumer_secret: process.env.CONSUMER_SECRET as string,
  access_token_key: process.env.ACCESS_TOKEN as string,
  access_token_secret: process.env.ACCESS_SECRET as string,
});

async function findTwitterIdByUsername(
  username: string
): Promise<string | boolean> {
  try {
    const { id_str } = await twitterClient.get("users/show", {
      screen_name: username,
    });

    return id_str;
  } catch (e) {
    return false;
  }
}

export { findTwitterIdByUsername };
