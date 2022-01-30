import { buildInputFromTracks, getWordCombinations } from "../../lib/tracks";
import searchApiResponse from "../mocks/search-api-response";
import selectedTracks from "../mocks/selected-tracks";

const words = ["I", "want", "to", "work", "for", "you"];

describe("tracks data transformations", () => {
  it("gets word combinations", () => {
    expect(getWordCombinations(words)).toEqual([
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

    expect(getWordCombinations([])).toEqual([]);
  });

  it("builds input from tracks", () => {
    expect(buildInputFromTracks(words, searchApiResponse)).toEqual(
      selectedTracks
    );
  });
});
