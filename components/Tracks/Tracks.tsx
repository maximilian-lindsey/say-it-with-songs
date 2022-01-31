import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MySession } from "../../lib/spotify";
import { Track } from "../../lib/spotify-types";
import { generateWordWithTracks } from "../../lib/tracks";
import { Button } from "../Button/Button";
import { Playlist } from "../Playlist/Playlist";

export const Tracks = () => {
  const { data: session } = useSession();

  const MAX_WORD_COUNT = 10;

  const router = useRouter();

  const initialQuery =
    (router.query.q && (router.query.q as string).trim().split(" ")) || [];

  const [words, setWords] = useState(initialQuery);

  const [input, setInput] = useState(
    (router.query.q && (router.query.q as string).trim()) || ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const [tracks, setTracks] = useState([] as Track[]);

  const saveInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    const splitInput = input.trim().split(" ");

    setWords(splitInput);
    setInput(input);
  };

  const generatePlaylist = async () => {
    setIsLoading(true);
    router.push({
      query: { q: words.join(" ") },
    });
    const tracks = await generateWordWithTracks(session as MySession, words);
    console.log(tracks);

    setTracks(tracks);
    setIsLoading(false);
  };

  return (
    <>
      <form>
        <input
          disabled={isLoading}
          type="text"
          name="words"
          onChange={saveInput}
          defaultValue={initialQuery.join(" ")}
        />
        <Button
          onClick={generatePlaylist}
          isDisabled={words.length > MAX_WORD_COUNT || isLoading}
          type="submit"
        >
          {isLoading ? "Loading" : "Generate Playlist"}
        </Button>
      </form>
      <div>
        {tracks.length > 0 &&
          tracks.map((track, index) => (
            <div key={index}>
              <img width={100} src={track.album.images[0].url} alt="" />
              <a href={track.uri}>{track.name}</a>
              <p>
                <span>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </span>
                <br />
                <span>{track.album.name}</span>
              </p>
            </div>
          ))}
        {/* `We couldn't find matching songs - try a different phrase` */}
      </div>
      {tracks.length > 0 && <Playlist input={input} tracks={tracks} />}
    </>
  );
};
