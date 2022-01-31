import { useSession } from "next-auth/react";
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
    console.log(res.status);
  };

  return (
    <>
      <button onClick={handleClick}>Save Playlist In Spotiy</button>
    </>
  );
};
