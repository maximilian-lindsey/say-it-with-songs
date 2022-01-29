import { useState } from "react";
import { Tracks } from "../../pages/api/search";

export const Words = () => {
  const MAX_WORD_COUNT = 10;

  const [words, setWords] = useState([] as string[]);

  const [isTooManyWords, setIsToManyWords] = useState(false);

  const validateWords = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    const words = input.trim().split(" ");

    if (words.length > MAX_WORD_COUNT) {
      setIsToManyWords(true);
    } else {
      setIsToManyWords(false);
    }

    setWords(words);
  };

  const getWordCombinations = () => {
    const combinations = [] as string[];
    for (let index = 0; index < words.length; index++) {
      for (let letter = index; letter < words.length; letter++) {
        const word = words.slice(index, letter + 1);
        combinations.push(word.join(" ").trim());
      }
    }
    return combinations;
  };

  const getTracks = async () => {
    const wordCombinations = getWordCombinations();
    for (const word of wordCombinations) {
      const res = await fetch(`/api/search?q="${word}"`);
      const { tracks } = (await res.json()) as Tracks;
      console.log(word);
      console.log(
        tracks.items.filter(
          (track) => track.name.toLowerCase() === word.toLowerCase()
        )
      );
    }
  };

  return (
    <>
      <input type="text" name="words" onChange={validateWords} />
      <p>{words.join(" ")}</p>
      <button disabled={isTooManyWords} onClick={getTracks}>
        Generate
      </button>
    </>
  );
};
