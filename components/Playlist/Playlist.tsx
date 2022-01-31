import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  addTracksToPlaylist,
  createPlaylist,
  MySession,
} from "../../lib/spotify";
import { Track } from "../../lib/spotify-types";

type PlaylistProps = {
  input: string;
  tracks: Track[];
};

export const Playlist = (props: PlaylistProps) => {
  const { data: session } = useSession();

  const { input, tracks } = props;

  const [status, setStatus] = useState(0);
  const [playlistId, setPlaylistId] = useState("");

  const handleClick = async () => {
    const playlist = await createPlaylist(session as MySession, {
      name: input,
      public: false,
      collaborative: false,
      description: "Created with https://say-it-with-songs.netlify.app/",
    });
    const uris = tracks.map((track) => track.uri);
    const res = await addTracksToPlaylist(
      session as MySession,
      playlist.tracks.href,
      playlist.id,
      uris
    );
    setPlaylistId(playlist.id);
    setStatus(res.status);
  };

  return (
    <>
      {status !== 201 ? (
        <button onClick={handleClick}>Save Playlist In Spotify</button>
      ) : (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      )}
    </>
  );
};
