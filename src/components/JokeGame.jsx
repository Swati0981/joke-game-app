import { useEffect, useState } from "react";
import "./JokeGame.css";

function JokeGame() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPunchline, setShowPunchline] = useState(false);
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [message, setMessage] = useState("");

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setShowPunchline(false);
      setMessage("");

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleCorrectGuess = () => {
    setScore(score + 1);
    setRounds(rounds + 1);
    setMessage("Great! You guessed the punchline.");
  };

  const handleWrongGuess = () => {
    setRounds(rounds + 1);
    setMessage("Good try! Maybe next joke.");
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h1>Joke Guess Game</h1>

        <p className="description">
          Try to guess the punchline before you reveal the answer.
        </p>

        <div className="score-box">
          <p>Score: {score}</p>
          <p>Rounds: {rounds}</p>
        </div>

        {loading && <p className="loading">Loading joke...</p>}

        {!loading && joke && (
          <div className="joke-box">
            <p className="joke-type">Type: {joke.type}</p>

            <h2>{joke.setup}</h2>

            {!showPunchline && (
              <button
                className="main-button"
                onClick={() => setShowPunchline(true)}
              >
                Show Answer
              </button>
            )}

            {showPunchline && (
              <div className="answer-box">
                <h3>{joke.punchline}</h3>

                <div className="button-group">
                  <button className="correct-button" onClick={handleCorrectGuess}>
                    I guessed it
                  </button>

                  <button className="wrong-button" onClick={handleWrongGuess}>
                    I missed it
                  </button>
                </div>
              </div>
            )}

            {message && <p className="message">{message}</p>}

            <button className="next-button" onClick={fetchJoke}>
              Next Joke
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeGame;