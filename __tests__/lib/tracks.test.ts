import { getWordCombinations } from "../../lib/tracks";

describe("tracks data transformations", () => {
  it("gets word combinations", () => {
    expect(
      getWordCombinations(["I", "want", "to", "work", "for", "you"])
    ).toEqual([
      "I",
      "I want",
      "I want to",
      "I want to work",
      "I want to work for",
      "I want to work for you",
      "want",
      "want to",
      "want to work",
      "want to work for",
      "want to work for you",
      "to",
      "to work",
      "to work for",
      "to work for you",
      "work",
      "work for",
      "work for you",
      "for",
      "for you",
      "you",
    ]);
  });

  expect(getWordCombinations([])).toEqual([]);
});
