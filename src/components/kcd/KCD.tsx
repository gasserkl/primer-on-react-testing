import React from "react";
import { Button } from "react-bootstrap";
import { useKCDQuote } from "../../hooks/useKCDQuote";

export function KCD() {
  const { nextQuote, currentQuote } = useKCDQuote();

  return (
    <div className="container">
      <div className="kcd">
        <div className="quote" aria-label="quote">
          <blockquote>{currentQuote} - Kent C. Dodds</blockquote>
          <Button variant="primary" size="sm" onClick={nextQuote}>
            More wisdom
          </Button>
        </div>
        <div className="mr-nice-guy">
          <img
            src="https://kentcdodds.com/static/kent-985f8a0db8a37e47da2c07080cffa865.png"
            alt="Kent C. Dodds"
            aria-label="mr-nice-guy"
          />
        </div>
      </div>
    </div>
  );
}
