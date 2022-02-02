import { Track } from "../../lib/spotify-types";
import Image from "next/image";
import styles from "./Tracks.module.scss";

type TrackListProps = {
  tracks: Track[];
};

export const TrackList = ({ tracks }: TrackListProps) => (
  <ul className={styles.trackList}>
    {tracks.map((track) => (
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
  </ul>
);
