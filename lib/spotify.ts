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
  is_playable: boolean;
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

type Endpoints = "playlist" | "search";

type SpotifyResult<T> = {
  status: number;
  data: T | null;
};

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?market=DE&type=track&limit=50`;
const DEFAULT_ENDPOINT = PLAYLIST_ENDPOINT;

const getUrl = (endpoint: Endpoints) => {
  switch (endpoint) {
    case "playlist":
      return PLAYLIST_ENDPOINT;
    case "search":
      return SEARCH_ENDPOINT;
    default:
      return DEFAULT_ENDPOINT;
  }
};

export const getSpotifyData = async <T>(
  endpoint: Endpoints,
  session: MySession | null,
  query?: string
): Promise<SpotifyResult<T>> => {
  if (session) {
    const url = `${getUrl(endpoint)}${
      query ? `&q=${encodeURIComponent(query)}` : ""
    }`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
    });

    if (res.status !== 200) {
      return {
        status: res.status,
        data: null,
      };
    }

    const result = (await res.json()) as T;

    return {
      status: res.status,
      data: result,
    };
  }
  return {
    status: 500,
    data: null,
  };
};

// export const createPlaylist = async (
//   session: MySession,
//   options: {
//     name: string;
//     public: boolean;
//     collaborative: boolean;
//     description: boolean;
//   }
// ) => {};

// export const addTracksToPlaylist = async (
//   session: MySession,
//   playlistId: string,
//   uris: string
// ) => {
//   // playlist_id/tracks
// };
