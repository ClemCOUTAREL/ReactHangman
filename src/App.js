import React, { Component } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import Counter from "./components/Counter";
import Guess from "./components/Guess";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const list = ["alphabet", "sunny", "fox", "chocolate", "pencil"];

class App extends Component {
  state = {
    guessWord: this.getRandomWord(),
    keyboard: this.generateLetters(),
    selectedLetters: [],
    lettersFound: [],
    tries: 10,
    gameState: "en cours",
    result: "Vous avez perdu 🥲, retentez votre chance",
  };

  getRandomWord() {
    let random = Math.floor(Math.random() * list.length);
    let guessWord = list[random];
    console.log(guessWord);
    return [...guessWord];
  }

  generateLetters() {
    const result = [];
    const size = 26;
    const allLetters = alphabet.split("");
    while (result.length < size) {
      const letter = allLetters.shift();
      result.push(letter);
    }
    return result;
  }

  getLetter = (e) => {
    let answer = e;
    let selectedLetters = this.state.selectedLetters;
    let result = [...selectedLetters, answer];
    this.setState({ selectedLetters: result }, this.check);
  };

  includesLetter(letter) {
    let test = this.state.selectedLetters;
    let test2 = letter.toUpperCase();
    return test.includes(test2);
  }

  check() {
    let result = this.state.tries - 1;
    if (result === 0) {
      this.setState({ gameState: "over" });
    }
    this.setState({ tries: result });
    let guess = this.state.guessWord;
    let test = this.state.selectedLetters;
    let checkedLetters = [];
    guess.forEach((letter) => {
      if (test.includes(letter.toUpperCase())) {
        checkedLetters.push(letter);
      }
      if (checkedLetters.length === guess.length) {
        this.setState({
          gameState: "fini",
          result: "Vous avez gagné 😁 !!! Félicitations",
        });
      }
    });
  }

  newGame = () => {
    this.setState({
      guessWord: this.getRandomWord(),
      selectedLetters: [],
      gameState: "en cours",
      tries: 10,
      lettersFound: [],
    });
  };

  render() {
    const { guessWord, keyboard, tries, gameState, result } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Hangman</h1>
        </header>
        <div className="guess-intro">
          <h2>Here's the word to find :</h2>
          <div className="guess-display">
            {guessWord.map((letter, index) => (
              <Guess
                letter={letter}
                key={index}
                isFound={this.includesLetter(letter)}
              />
            ))}
          </div>
        </div>
        <Counter
          className={gameState}
          tries={tries}
          feedback={gameState}
          result={result}
          onClick={this.newGame}
        />
        <div
          className={gameState === "en cours" ? "keyboard" : "keyboard-hidden"}
        >
          {keyboard.map((letter, index) => (
            <Keyboard letter={letter} key={index} onClick={this.getLetter} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
