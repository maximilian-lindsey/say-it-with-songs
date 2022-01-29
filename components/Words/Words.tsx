import { useState } from "react";
import { generateWordWithTracks } from "../../lib/tracks";
import { Track } from "../../pages/api/search";

export const Words = () => {
  const MAX_WORD_COUNT = 10;

  const [words, setWords] = useState([] as string[]);

  const [isTooManyWords, setIsTooManyWords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tracks, setTracks] = useState([] as Track[]);

  const validateInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    const words = input.trim().split(" ");

    if (words.length > MAX_WORD_COUNT) {
      setIsTooManyWords(true);
    } else {
      setIsTooManyWords(false);
    }

    setWords(words);
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
        onChange={validateInput}
      />
      <button disabled={isTooManyWords || isLoading} onClick={generatePlaylist}>
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
