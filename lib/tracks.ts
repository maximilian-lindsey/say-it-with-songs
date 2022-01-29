import { signIn } from "next-auth/react";
import { Tracks, Track } from "../pages/api/search";

type ResolvedTracks = Record<string, Track[]>;

export const getWordCombinations = (words: string[]) => {
  const combinations = [] as string[];
  for (let index = 0; index < words.length; index++) {
    for (let letter = index; letter < words.length; letter++) {
      const word = words.slice(index, letter + 1);
      combinations.push(word.join(" ").trim());
    }
  }
  return combinations;
};

export const getTracks = async (words: string[]) => {
  const wordCombinations = getWordCombinations(words);

  const tracks = {};
  for (const word of wordCombinations) {
    const res = await fetch(`/api/search?q="${word}"`);
    if (res.status === 200) {
      const { tracks } = (await res.json()) as Tracks;
      console.log(word);
      console.log(
        tracks.items.filter(
          (track) => track.name.toLowerCase() === word.toLowerCase()
        )
      );
    } else {
      console.error(res);
      if (res.status === 401) {
        signIn();
      }
      break;
    }
  }
};
