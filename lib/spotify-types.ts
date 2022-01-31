type ExternalUrls = {
  spotify: string;
};

type SpotifyBase = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type Artist = SpotifyBase;

type Album = SpotifyBase & {
  album_type: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
};

export type Track = SpotifyBase & {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  is_local: boolean;
  is_playable: boolean;
  popularity: number;
  preview_url: string;
  track_number: number;
};

export type Tracks = {
  tracks: {
    href: string;
    items: Track[];
  };
};

type Followers = {
  href: string;
  total: number;
};

type Owner = SpotifyBase & {
  display_name: string;
  followers: Followers;
  images: Image[];
};

export type PlaylistCreation = SpotifyBase & {
  collaborative: boolean;
  description: string | null;
  followers: Followers;
  href: string;
  images: Image[];
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: Track[];
    limit: number;
    next: string;
    offest: number;
    previous: number;
    total: number;
  };
};
