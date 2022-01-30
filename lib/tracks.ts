import { Tracks, Track } from "../pages/api/search";

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

  const tracks = await Promise.all(
    wordCombinations.map((word) =>
      fetch(`/api/search?q="${word}"`)
        .then((res) => res.json())
        .then((res: Tracks) => {
          const filteredTracks = res.tracks.items.filter(
            (track) => track.name.toLowerCase() === word.toLowerCase()
          );
          if (filteredTracks.length > 0) {
            return filteredTracks.sort(
              (a, b) => b.popularity - a.popularity
            )[0];
          }
          return null;
        })
    )
  );

  const filteredTracks = tracks.filter((track) => track) as Track[];
  return filteredTracks;
};

export const buildInputFromTracks = (words: Words, tracks: Track[]) => {
  const input = words.join(" ").toLowerCase();
  const selectedTracks = [];
  let phrase = "";
  for (const track of tracks) {
    const partialPhrase = `${phrase} ${track.name.toLowerCase()}`.trim();
    if (input.startsWith(partialPhrase)) {
      selectedTracks.push(track);
      phrase = partialPhrase;
    }
  }

  return selectedTracks
    .map((track) => track.name)
    .join(" ")
    .toLowerCase() == input
    ? selectedTracks
    : [];
};

export const generateWordWithTracks = async (words: Words) => {
  const tracks = await getTracks(words);
  const selectedTracks = buildInputFromTracks(words, tracks);

  return selectedTracks;
};
