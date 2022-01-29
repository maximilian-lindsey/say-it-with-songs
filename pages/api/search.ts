import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getSpotifyData } from "../../lib/spotify";
import { DefaultSession } from "next-auth";

type ExternalUrls = {
  spotify: string;
};

type SpotifyBase = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type Artist = SpotifyBase;

type Album = SpotifyBase & {
  album_type: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
};

export type Track = SpotifyBase & {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  is_local: boolean;
  is_playable: true;
  popularity: number;
  preview_url: string;
  track_number: number;
};

export type Tracks = {
  tracks: {
    href: string;
    items: Track[];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query?.q as string;
  const session = await getSession({ req });

  const searchResults = await getSpotifyData<Tracks>("search", session, query);
  res.status(searchResults.status).json(searchResults.data);
}
