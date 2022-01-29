import { useState } from "react";
import { PlaylistType } from "../../pages/api/playlists";

export const Playlists = () => {
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setList(items);
  };

  return (
    <>
      <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
      {list.map((item: PlaylistType) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <img
            src={
              (item.images && item.images.length >= 0 && item.images[0].url) ||
              ""
            }
            width="100"
          />
        </div>
      ))}
    </>
  );
};
