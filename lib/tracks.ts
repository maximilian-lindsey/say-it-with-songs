import { signIn } from "next-auth/react";
import { Tracks, Track } from "../pages/api/search";

type ResolvedTracks = Track[];

type Words = string[];

export const getWordCombinations = (words: Words) => {
  const combinations = [] as Words;
  for (let index = 0; index < words.length; index++) {
    for (let letter = index; letter < words.length; letter++) {
      const word = words.slice(index, letter + 1);
      combinations.push(word.join(" ").trim());
    }
  }
  return combinations;
};

export const getTracks = async (words: Words) => {
  const wordCombinations = getWordCombinations(words);

  const resolvedTracks = [] as ResolvedTracks;

  for (const word of wordCombinations) {
    const res = await fetch(`/api/search?q="${word}"`);
    if (res.status === 200) {
      const { tracks } = (await res.json()) as Tracks;
      const filteredTracks = tracks.items.filter(
        (track) => track.name.toLowerCase() === word.toLowerCase()
      );
      if (filteredTracks.length > 0) {
        resolvedTracks.push(
          // filter by popularity
          filteredTracks.sort((a, b) => b.popularity - a.popularity)[0]
          // get random track
          // filteredTracks[Math.floor(Math.random() * filteredTracks.length)]
        );
      }
    } else {
      console.error(res);
      if (res.status === 401) {
        signIn();
      }
      break;
    }
  }
  return resolvedTracks;
};

export const generateWordWithTracks = async (words: Words) => {
  const input = words.join(" ").toLowerCase();
  const tracks = await getTracks(words);
  const selectedTracks = [];
  let phrase = "";
  for (const track of tracks) {
    const partialPhrase = `${phrase} ${track.name.toLowerCase()}`.trim();
    if (input.startsWith(partialPhrase)) {
      selectedTracks.push(track);
      phrase = partialPhrase;
    }
  }
  //TODO handle empty or partial results
  return selectedTracks;
};
