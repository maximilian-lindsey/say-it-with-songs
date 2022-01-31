import { DefaultSession } from "next-auth";
import { PlaylistCreation } from "./spotify-types";
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

export const createPlaylist = async (
  session: MySession,
  options: {
    name: string;
    public: boolean;
    collaborative: boolean;
    description: string;
  }
) => {
  const res = await fetch(getUrl("playlist"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
    body: JSON.stringify(options),
  });
  const playlist = (await res.json()) as PlaylistCreation;
  console.log(playlist);
  return playlist;
};

export const addTracksToPlaylist = async (
  session: MySession,
  tracksUri: string,
  playlistId: string,
  uris: string[]
) => {
  const res = await fetch(tracksUri, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user?.accessToken}`,
    },
    body: JSON.stringify({ uris }),
  });
  return res;
};
