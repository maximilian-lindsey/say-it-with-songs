import { getSpotifyData } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

import { DefaultSession } from "next-auth";

interface MyUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  image?: string | null;
  accessToken?: string | null;
}

export interface MySession extends Omit<DefaultSession, "user"> {
  user?: MyUser;
  expires: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const playlists = await getSpotifyData("playlist", session);

  res.status(200).json(playlists);
};

export default handler;
