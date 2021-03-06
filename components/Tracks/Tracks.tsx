import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { text } from "../../content/en-us";
import { MySession } from "../../lib/spotify";
import { Track } from "../../lib/spotify-types";
import { generateWordWithTracks } from "../../lib/tracks";
import { Button } from "../Button/Button";
import { Playlist } from "../Playlist/Playlist";
import { TrackList } from "./TrackList";

import styles from "./Tracks.module.scss";

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

  const [tracks, setTracks] = useState<Track[] | null>(null);

  const [isSearchFocus, setIsSearchFocus] = useState(false);

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

    setTracks(tracks);
    setIsLoading(false);
    setIsSearchFocus(false);
  };

  const onSearchFocus = () => {
    setIsSearchFocus(true);
  };

  return (
    <section className={styles.tracks}>
      <form className={styles.search}>
        <input
          disabled={isLoading}
          type="text"
          name="words"
          onChange={saveInput}
          defaultValue={initialQuery.join(" ")}
          className={styles.input}
          placeholder={text.tracks.search.placeholder}
          onFocus={onSearchFocus}
        />
        <Button
          onClick={generatePlaylist}
          isDisabled={words.length > MAX_WORD_COUNT || isLoading}
          type="submit"
          isGhost={!isSearchFocus}
        >
          {words.length > MAX_WORD_COUNT
            ? text.tracks.button.disabled
            : isLoading
            ? text.tracks.button.loading
            : text.tracks.button.idle}
        </Button>
      </form>
      {tracks && tracks.length > 0 && <TrackList tracks={tracks} />}
      {tracks && tracks.length === 0 && <p>{text.tracks.search.emptyResult}</p>}
      {tracks && tracks.length > 0 && (
        <Playlist input={input} tracks={tracks} />
      )}
    </section>
  );
};
