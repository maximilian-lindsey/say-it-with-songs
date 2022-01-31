import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { copy } from "../../content/en-us";
import { MySession } from "../../lib/spotify";
import { Track } from "../../lib/spotify-types";
import { generateWordWithTracks } from "../../lib/tracks";
import { Button } from "../Button/Button";
import { Playlist } from "../Playlist/Playlist";
import styles from "./Tracks.module.scss";
import Image from "next/image";

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
    console.log(tracks);

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
          placeholder={copy.tracks.search.placeholder}
          onFocus={onSearchFocus}
        />
        <Button
          onClick={generatePlaylist}
          isDisabled={words.length > MAX_WORD_COUNT || isLoading}
          type="submit"
          isGhost={!isSearchFocus}
        >
          {words.length > MAX_WORD_COUNT
            ? copy.tracks.button.disabled
            : isLoading
            ? copy.tracks.button.loading
            : copy.tracks.button.idle}
        </Button>
      </form>
      <ul className={styles.trackList}>
        {tracks.length > 0 &&
          tracks.map((track) => (
            <li className={styles.track} key={track.id}>
              <a className={styles.trackImage} href={track.uri}>
                <Image
                  width={100}
                  height={100}
                  src={track.album.images[0].url}
                  alt={`${track.name} by ${track.artists
                    .map((artist) => artist.name)
                    .join(", ")}`}
                />
              </a>
              <p className={styles.trackMeta}>
                <a className={styles.trackName} href={track.uri}>
                  {track.name}
                </a>
                <span className={styles.trackArtists}>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </span>
              </p>
            </li>
          ))}
        {/* `We couldn't find matching songs - try a different phrase` */}
      </ul>
      {tracks.length > 0 && <Playlist input={input} tracks={tracks} />}
    </section>
  );
};
