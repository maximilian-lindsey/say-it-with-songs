import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query?.q as string;
  const session = await getSession({ req });

  const searchResults = await getSpotifyData("search", session, query);
  res.status(200).json(searchResults);
}
