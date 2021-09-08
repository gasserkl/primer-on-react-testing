import { useState } from "react";

export const quotes = [
  "Hi, I'm Kent C. Dodds. I help people make the world better through quality software.",
  "The more your tests resemble the way your software is used, the more confidence they can give you.",
  "Write tests. Not too many. Mostly integration.",
];

export function useKCDQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  function nextQuote() {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  }

  return {
    currentQuote: quotes[quoteIndex],
    nextQuote,
  };
}
