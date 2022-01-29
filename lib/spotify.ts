import { MySession } from "../pages/api/playlists";

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
