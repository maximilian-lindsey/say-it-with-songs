import { useState } from "react";

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

  return (
    <>
      <input type="text" name="words" onChange={validateWords} />
      <p>{words.join(" ")}</p>
      <button disabled={isTooManyWords}>Generate</button>
    </>
  );
};
