import { MySession } from "../pages/api/playlists";

type Endpoints = "playlist";

const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const DEFAULT_ENDPOINT = PLAYLIST_ENDPOINT;

const getUrl = (endpoint: Endpoints) => {
  switch (endpoint) {
    case "playlist":
      return PLAYLIST_ENDPOINT;

    default:
      return DEFAULT_ENDPOINT;
  }
};

export const getSpotifyData = async (
  endpoint: Endpoints,
  session: MySession | null
) => {
  if (session) {
    const res = await fetch(getUrl(endpoint), {
      headers: {
        Authorization: `Bearer ${session.user?.accessToken}`,
      },
    });

    return res.json();
  }
  return null;
};
