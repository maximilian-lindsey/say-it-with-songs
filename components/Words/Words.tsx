import { useState } from "react";
import { getTracks } from "../../lib/tracks";

export const Words = () => {
  const MAX_WORD_COUNT = 10;

  const [words, setWords] = useState([] as string[]);

  const [isTooManyWords, setIsToManyWords] = useState(false);

  const validateInput = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    const words = input.trim().split(" ");

    if (words.length > MAX_WORD_COUNT) {
      setIsToManyWords(true);
    } else {
      setIsToManyWords(false);
    }

    setWords(words);
  };

  const generatePlaylist = () => {
    getTracks(words);
  };

  return (
    <>
      <input type="text" name="words" onChange={validateInput} />
      <p>{words.join(" ")}</p>
      <button disabled={isTooManyWords} onClick={generatePlaylist}>
        Generate
      </button>
    </>
  );
};
