import React from "react";

const Keyboard = ({ letter, onClick }) => (
  <div className={"keyboard-btn"} onClick={() => onClick(letter)}>
    {letter}
  </div>
);

export default Keyboard;
