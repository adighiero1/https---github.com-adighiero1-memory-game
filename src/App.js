import React, { useState, useEffect } from "react";
import "./index.css";

const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MemoryGame = () => {
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const handleCardClick = (index) => {
    setDisabled(true);
    setFlipped([...flipped, index]);
    if (flipped.length === 1) {
      if (colors[index] === colors[flipped[0]]) {
        setSolved([...solved, ...flipped, index]);
        resetCards();
        setScore(score + 1);
      } else {
        setTimeout(resetCards, 1000);
      }
    } else {
      setDisabled(false);
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const resetGame = () => {
    const shuffledColors = shuffleArray(COLORS);
    setColors([
      ...shuffleArray(shuffledColors),
      ...shuffleArray(shuffledColors),
    ]);
    setScore(0);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const isDisabled = (index) => {
    return disabled || solved.includes(index) || flipped.includes(index);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="score-container">
        <h2>Score: {score}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
      <div className="cards">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`card ${isDisabled(index) ? "disabled" : ""}`}
            onClick={() => (isDisabled(index) ? null : handleCardClick(index))}
            style={{
              backgroundColor:
                flipped.includes(index) || solved.includes(index)
                  ? color
                  : "white",
            }}
          ></div>
        ))}
      </div>
      <button className="give-up" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default MemoryGame;
