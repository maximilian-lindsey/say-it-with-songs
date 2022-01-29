import { useRouter } from "next/router";
import { useState } from "react";
import { generateWordWithTracks } from "../../lib/tracks";
import { Track } from "../../pages/api/search";

export const Words = () => {
  const MAX_WORD_COUNT = 10;

  const router = useRouter();

  const initialQuery =
    (router.query.q && (router.query.q as string).trim().split(" ")) || [];

  const [words, setWords] = useState(initialQuery);

  const [isLoading, setIsLoading] = useState(false);

  const [tracks, setTracks] = useState([] as Track[]);

  const saveInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    const splitInput = input.trim().split(" ");

    setWords(splitInput);
    router.push({
      query: { q: input },
    });
  };

  const generatePlaylist = async () => {
    setIsLoading(true);
    const tracks = await generateWordWithTracks(words);
    console.log(tracks);

    setTracks(tracks);
    setIsLoading(false);
  };

  return (
    <>
      <input
        disabled={isLoading}
        type="text"
        name="words"
        onChange={saveInput}
        value={initialQuery.join(" ")}
      />
      <button
        disabled={words.length > MAX_WORD_COUNT || isLoading}
        onClick={generatePlaylist}
      >
        {isLoading ? "Loading" : "Generate Playlist"}
      </button>
      <div>
        {tracks.map((track, index) => (
          <p key={index}>
            <img width={100} src={track.album.images[0].url} alt="" />
            <a href={track.uri}>{track.name}</a>
          </p>
        ))}
      </div>
    </>
  );
};
