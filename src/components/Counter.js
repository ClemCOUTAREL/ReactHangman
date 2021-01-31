import React from "react";

const Counter = ({ tries, feedback, result, onClick }) => (
  <div className="guesses">
    <div
      className={feedback === "en cours" ? "state-revealed" : "state-hidden"}
    >
      <h3>Il vous reste {tries} tentatives</h3>
    </div>
    <div
      className={feedback === "en cours" ? "state-hidden" : "state-revealed"}
    >
      <div>{result}</div>
      <button
        onClick={() => {
          onClick();
        }}
      >
        Relancer une partie
      </button>
    </div>
  </div>
);

export default Counter;
