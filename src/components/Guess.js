const Guess = ({ letter, isFound }) => (
  <div
    className={
      isFound === true ? "guess-letter-revealed" : "guess-letter-hidden"
    }
  >
    {letter}
  </div>
);

export default Guess;
